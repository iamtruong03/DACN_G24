package com.group24.cors.customer.services;

import com.group24.cors.customer.model.request.CustomerBookingRequest;
import com.group24.entities.Booking;
import jakarta.servlet.http.HttpServletRequest;

import java.io.UnsupportedEncodingException;

public interface CustomerVNPayService {

    Booking saveBooking(CustomerBookingRequest request);

    String customerVNPay(CustomerBookingRequest customerBookingRequest, HttpServletRequest request) throws UnsupportedEncodingException;

    Boolean orderReturn(HttpServletRequest request);

}
