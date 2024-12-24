package com.group24.cors.customer.services.impl;

import com.group24.cors.customer.model.request.CustomerBookingRequest;
import com.group24.cors.customer.repository.CustomerBookingRepository;
import com.group24.cors.customer.repository.CustomerCartDetailRepository;
import com.group24.cors.customer.repository.CustomerHomestayRepository;
import com.group24.cors.customer.services.CustomerVNPayService;
import com.group24.entities.Booking;
import com.group24.entities.Homestay;
import com.group24.infrastructure.configpayment.VNPayConfig;
import com.group24.infrastructure.contant.PaymentMethod;
import com.group24.infrastructure.contant.StatusBooking;
import com.group24.infrastructure.exception.rest.RestApiException;
import com.group24.repositories.PromotionRepository;
import com.group24.repositories.UserRepository;
import com.group24.util.DateUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

@Service
public class CustomerVNPayServiceImpl implements CustomerVNPayService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CustomerHomestayRepository homestayRepository;
    @Autowired
    private CustomerBookingRepository customerBookingRepository;
    @Autowired
    private CustomerCartDetailRepository customerCartDetailRepository;

    @Override
    public Booking saveBooking(CustomerBookingRequest request) {
        Booking booking = new Booking();
        Homestay homestay = homestayRepository.findById(request.getHomestayId()).get();
        if (homestay == null) {
            throw new RestApiException("Homestay khong ton tai!");
        }
        if (homestay.getPromotion() == null) {
            booking.setPromotion(null);
        } else {
            booking.setPromotion(homestay.getPromotion());
        }
        BigDecimal totalPrice = new BigDecimal(request.getTotalPrice());
        booking.setTypeBooking(request.getTypeBooking());
        booking.setUser(userRepository.findById(request.getUserId()).get());
        booking.setCode("HD" + DateUtils.getCurrentDateAsString() + VNPayConfig.getRandomNumber(4));
        booking.setTotalPrice(totalPrice);
        booking.setStartDate(request.getStartDate());
        booking.setEndDate(request.getEndDate());
        booking.setName(request.getName());
        booking.setEmail(request.getEmail());
        booking.setPhoneNumber(request.getPhoneNumber());
        booking.setHomestay(homestay);
        booking.setNote(request.getNote());
        booking.setStatus(StatusBooking.CHO_THANH_TOAN);
        booking.setNumberOfNight(request.getNumberOfNight());
        booking.setPaymentMethod(PaymentMethod.VN_PAY);
        booking.setRefundPrice(new BigDecimal(0));
        customerBookingRepository.save(booking);
        return booking;
    }

    @Override
    public String customerVNPay(CustomerBookingRequest customerBookingRequest, HttpServletRequest request) throws UnsupportedEncodingException {
        Booking booking = saveBooking(customerBookingRequest);
        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        cld.add(Calendar.MINUTE, 15);

        String vnp_ExpireDate = formatter.format(cld.getTime());
        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", VNPayConfig.vnp_Version);
        vnp_Params.put("vnp_Command", VNPayConfig.vnp_Command);
        vnp_Params.put("vnp_TmnCode", VNPayConfig.vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(booking.getTotalPrice().multiply(BigDecimal.valueOf(100))));
        vnp_Params.put("vnp_BankCode", VNPayConfig.vnp_BankCode);
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
        vnp_Params.put("vnp_CurrCode", VNPayConfig.vnp_CurrCode);
        vnp_Params.put("vnp_IpAddr", VNPayConfig.getIpAddress(request));
        vnp_Params.put("vnp_Locale", VNPayConfig.vnp_Locale);
        vnp_Params.put("vnp_OrderInfo", booking.getId());
        vnp_Params.put("vnp_OrderType", "Thanh toan hoa don");
        vnp_Params.put("vnp_ReturnUrl", VNPayConfig.vnp_ReturnUrl);
        vnp_Params.put("vnp_TxnRef", VNPayConfig.getRandomNumber(6));
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldList = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldList);

        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();

        Iterator itr = fieldList.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = vnp_Params.get(fieldName);
            if (fieldValue != null && (fieldValue.length() > 0)) {
                hashData.append(fieldName);
                hashData.append("=");
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));

                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append("=");
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));

                if (itr.hasNext()) {
                    query.append("&");
                    hashData.append("&");
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = VNPayConfig.hmacSHA512(VNPayConfig.secretKey, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = VNPayConfig.vnp_PayUrl + "?" + queryUrl;
        return paymentUrl;
    }

    @Override
    public Boolean orderReturn(HttpServletRequest request) {
        Map fields = new HashMap();
        for (Enumeration params = request.getParameterNames(); params.hasMoreElements(); ) {
            String fieldName = null;
            String fieldValue = null;
            try {
                fieldName = URLEncoder.encode((String) params.nextElement(), StandardCharsets.US_ASCII.toString());
                fieldValue = URLEncoder.encode(request.getParameter(fieldName), StandardCharsets.US_ASCII.toString());
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                fields.put(fieldName, fieldValue);
            }
        }

        String vnp_SecureHash = request.getParameter("vnp_SecureHash");
        if (fields.containsKey("vnp_SecureHashType")) {
            fields.remove("vnp_SecureHashType");
        }
        if (fields.containsKey("vnp_SecureHash")) {
            fields.remove("vnp_SecureHash");
        }
        String signValue = VNPayConfig.hashAllFields(fields);
        Booking booking = customerBookingRepository.findById((String) fields.get("vnp_OrderInfo")).orElse(null);
        if (signValue.equals(vnp_SecureHash)) {
            if ("00".equals(request.getParameter("vnp_TransactionStatus"))) {
                booking.setStatus(StatusBooking.THANH_CONG);
                customerBookingRepository.save(booking);
                customerCartDetailRepository.deleteByHomestayId(booking.getHomestay().getId(), booking.getUser().getId());
                return true;
            }
        }
        return false;
    }

}
