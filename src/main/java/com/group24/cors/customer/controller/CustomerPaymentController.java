package com.group24.cors.customer.controller;

import com.group24.cors.common.base.ResponseObject;
import com.group24.cors.customer.model.request.CustomerBookingRequest;
import com.group24.cors.customer.services.CustomerPaypalService;
import com.group24.cors.customer.services.CustomerVNPayService;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/api/v1/payment")
public class CustomerPaymentController {

    @Autowired
    private CustomerVNPayService customerVNPayService;
    @Autowired
    private CustomerPaypalService customerPaypalService;

    @PostMapping("/vnpay")
    public ResponseObject paymentWithVNPay(@RequestBody CustomerBookingRequest customerBookingRequest, HttpServletRequest request) {
        try {
            return new ResponseObject(customerVNPayService.customerVNPay(customerBookingRequest, request));
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/booking-return")
    public ResponseObject paymentSuccess(HttpServletRequest request) {
        return new ResponseObject(customerVNPayService.orderReturn(request));
    }

    @PostMapping("/paypal")
    public ResponseObject paymentWithPaypal(@RequestBody CustomerBookingRequest customerBookingRequest) {
        try {
            Payment payment = customerPaypalService.createPayment(customerBookingRequest);
            for (Links link : payment.getLinks()) {
                if (link.getRel().equals("approval_url")) {
                    return new ResponseObject(link.getHref());
                }
            }
        } catch (PayPalRESTException e) {
            e.printStackTrace();
        }
        return null;
    }

    @GetMapping("/sucess")
    public String successPay(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId) {
        try {
            Payment payment = customerPaypalService.executePayment(paymentId, payerId);
            System.out.println(payment.toJSON());
            if (payment.getState().equals("approved")) {
                return "success";
            }
        } catch (PayPalRESTException e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

    @GetMapping("/send-mail")
    public ResponseObject sendBillBookinng(@RequestParam("bookingId") String bookingId) {
        return new ResponseObject(customerPaypalService.sendBillBooking(bookingId));
    }

}
