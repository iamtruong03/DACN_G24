package com.group24.cors.homestayowner.service;

import com.group24.cors.common.base.PageableObject;
import com.group24.cors.homestayowner.model.reponse.HomestayNumberOfBookingTodayReponse;
import com.group24.cors.homestayowner.model.reponse.HomestayOwnerUserBookingReponse;
import com.group24.cors.homestayowner.model.request.HomestayOwnerBookingRequest;
import com.group24.entities.Booking;

public interface HomestayOwnerBookingService {
    HomestayNumberOfBookingTodayReponse getNumberOfBookingsCho(String id);

    HomestayNumberOfBookingTodayReponse getNumberOfBookingsToday(String id);

    PageableObject<HomestayOwnerUserBookingReponse> getBookingByUser(String id, HomestayOwnerBookingRequest request);

    PageableObject<Booking> getBookingByHomestay(String id, HomestayOwnerBookingRequest homestayOwnerBookingRequest);

    PageableObject<Booking> getAllBooking(HomestayOwnerBookingRequest request);

    PageableObject<Booking> getBookingByYearAndMonth(HomestayOwnerBookingRequest request);

}
