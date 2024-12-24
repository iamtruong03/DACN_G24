package com.group24.cors.admin.services;

import com.group24.cors.admin.model.request.AdminBookingByHomestayRequest;
import com.group24.cors.admin.model.request.AdminBookingRequest;
import com.group24.cors.admin.model.response.AdminBookingResponse;
import com.group24.cors.common.base.PageableObject;
import com.group24.entities.Booking;

public interface AdminBookingService {

    PageableObject<Booking> getAllBooking(AdminBookingRequest request);

    PageableObject<AdminBookingResponse> getAllBookingByHomestay(AdminBookingByHomestayRequest request);

    Booking updateAdminTranCode(AdminBookingRequest request);

    Booking updateCancellTranCode(AdminBookingRequest request);
}
