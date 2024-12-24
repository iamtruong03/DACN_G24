package com.group24.cors.customer.services;

import com.group24.cors.common.base.PageableObject;
import com.group24.cors.customer.model.request.CustomerBookingRequest;
import com.group24.entities.Booking;

public interface CustomerBookingService {

    PageableObject<Booking> getBookingByUser(CustomerBookingRequest request);

    Booking updateBooking(CustomerBookingRequest request);

    Booking cancel(String id, CustomerBookingRequest request);

}
