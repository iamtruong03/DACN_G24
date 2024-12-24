package com.group24.cors.customer.services.impl;

import com.group24.cors.customer.model.request.CustomerBookingRequest;
import com.group24.cors.customer.model.response.InvoiceResponse;
import com.group24.cors.customer.repository.CustomerBookingRepository;
import com.group24.cors.customer.repository.CustomerHomestayRepository;
import com.group24.cors.customer.services.CustomerPaypalService;
import com.group24.entities.Booking;
import com.group24.entities.Homestay;
import com.group24.infrastructure.configemail.EmailSender;
import com.group24.infrastructure.configpayment.VNPayConfig;
import com.group24.infrastructure.contant.PaymentMethod;
import com.group24.infrastructure.contant.StatusBooking;
import com.group24.infrastructure.exception.rest.RestApiException;
import com.group24.infrastructure.paypalconfig.PaypalConfig;
import com.group24.infrastructure.sendmailbill.ExportFilePdfFormHtml;
import com.group24.repositories.UserRepository;
import com.group24.util.DateUtils;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.paypal.api.payments.Amount;
import com.paypal.api.payments.Payer;
import com.paypal.api.payments.Payment;
import com.paypal.api.payments.PaymentExecution;
import com.paypal.api.payments.RedirectUrls;
import com.paypal.api.payments.Transaction;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@Service
public class CustomerPaypalServiceImpl implements CustomerPaypalService {

    @Autowired
    private APIContext apiContext;
    @Autowired
    private CustomerHomestayRepository homestayRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CustomerBookingRepository customerBookingRepository;
    @Autowired
    private ExportFilePdfFormHtml exportFilePdfFormHtml;
    @Autowired
    private SpringTemplateEngine springTemplateEngine;
    @Autowired
    private EmailSender emailSender;

    @Override
    public Payment createPayment(CustomerBookingRequest customerBookingRequest) throws PayPalRESTException {
        Booking booking = new Booking();
        Homestay homestay = homestayRepository.findById(customerBookingRequest.getHomestayId()).get();
        if (homestay == null) {
            throw new RestApiException("Homestay khong ton tai!");
        }
        BigDecimal totalPrice = new BigDecimal(customerBookingRequest.getTotalPrice());
        if (homestay.getPromotion() == null) {
            booking.setPromotion(null);
        } else {
            booking.setPromotion(homestay.getPromotion());
        }
        booking.setTypeBooking(customerBookingRequest.getTypeBooking());
        booking.setUser(userRepository.findById(customerBookingRequest.getUserId()).get());
        booking.setTotalPrice(totalPrice);
        booking.setCode("HD" + DateUtils.getCurrentDateAsString() + VNPayConfig.getRandomNumber(4));
        booking.setStartDate(customerBookingRequest.getStartDate());
        booking.setEndDate(customerBookingRequest.getEndDate());
        booking.setName(customerBookingRequest.getName());
        booking.setEmail(customerBookingRequest.getEmail());
        booking.setPhoneNumber(customerBookingRequest.getPhoneNumber());
        booking.setHomestay(homestay);
        booking.setPaymentMethod(PaymentMethod.PAYPAL);
        booking.setNote(customerBookingRequest.getNote());
        booking.setStatus(StatusBooking.CHO_THANH_TOAN);
        booking.setNumberOfNight(customerBookingRequest.getNumberOfNight());
        booking.setRefundPrice(new BigDecimal(0));
        customerBookingRepository.save(booking);

        Amount amount = new Amount();
        amount.setCurrency(PaypalConfig.currency);
        amount.setTotal(String.format("%.2f", convertVNDtoUSD(customerBookingRequest.getTotalPrice())));

        Transaction transaction = new Transaction();
        transaction.setDescription("Thanh toan hoa don");
        transaction.setAmount(amount);
        transaction.setReferenceId(booking.getId());

        List<Transaction> transactionList = new ArrayList<>();
        transactionList.add(transaction);

        Payer payer = new Payer();
        payer.setPaymentMethod(PaypalConfig.method);

        Payment payment = new Payment();
        payment.setIntent("SALE");
        payment.setPayer(payer);
        payment.setTransactions(transactionList);

        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl(PaypalConfig.cancelUrl);
        redirectUrls.setReturnUrl(PaypalConfig.successUrl + "?bookingId=" + booking.getId());
        payment.setRedirectUrls(redirectUrls);

        return payment.create(apiContext);
    }

    @Override
    public Payment executePayment(String paymentId, String payerId) throws PayPalRESTException {
        Payment payment = new Payment();
        payment.setId(paymentId);
        PaymentExecution paymentExecute = new PaymentExecution();
        paymentExecute.setPayerId(payerId);
        return payment.execute(apiContext, paymentExecute);
    }

    @Override
    public boolean sendBillBooking(String bookingId) {
        Booking booking = customerBookingRepository.findById(bookingId).orElse(null);
        InvoiceResponse invoiceResponse = exportFilePdfFormHtml.getInvoiceResponse(bookingId);
        String email = booking.getEmail();
        if (!email.isEmpty() && booking.getStatus() == StatusBooking.THANH_CONG) {
            sendMail(invoiceResponse, "http://localhost:3000/booking/homestay/detail/" + booking.getHomestay().getId(), booking.getEmail());
            return true;
        } else {
            return false;
        }
    }

    public static double convertVNDtoUSD(double vndAmount) {
        try {
            URL url = new URL("https://open.er-api.com/v6/latest/USD");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            InputStreamReader reader = new InputStreamReader(connection.getInputStream());
            JsonObject jsonResponse = JsonParser.parseReader(reader).getAsJsonObject();

            // Lấy tỷ giá VND từ JSON response
            double vndRate = jsonResponse.getAsJsonObject("rates").get("VND").getAsDouble();

            reader.close();

            // Chuyển đổi số tiền từ VND sang USD
            double usdAmount = vndAmount / vndRate;

            return usdAmount;

        } catch (Exception e) {
            e.printStackTrace();
            return -1.0; // Trả về giá trị âm nếu có lỗi
        }
    }

    public void sendMail(InvoiceResponse invoice, String url, String email) {
        if (email.matches("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$")) {
            Context dataContextSendMail = exportFilePdfFormHtml.setDataSendMail(invoice, url);
            String finalHtmlSendMail = springTemplateEngine.process("templateBillSendEmail", dataContextSendMail);
            String subject = "Biên lai thanh toán ";
            emailSender.sendBill(email, subject, finalHtmlSendMail);
        }
    }

}
