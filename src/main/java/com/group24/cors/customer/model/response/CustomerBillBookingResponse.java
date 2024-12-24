package com.group24.cors.customer.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface CustomerBillBookingResponse {

    @Value("#{target.name_user}")
    String getUser_Name();

    @Value("#{target.phone_number}")
    String getPhoneNumber();

    @Value("#{target.email}")
    String getEmail();

    @Value("#{target.created_date}")
    String getCreatedDate();

    @Value("#{target.start_date}")
    String getStartDate();

    @Value("#{target.end_date}")
    String getEndDate();

    @Value("#{target.total_price}")
    String getTotalPrice();

    @Value("#{target.type_booking}")
    Integer getTypeBooking();

    @Value("#{target.code}")
    String getCode();

    @Value("#{target.sum_price}")
    String getSumPrice();

    @Value("#{target.name_homestay}")
    String getNameHomestay();

    @Value("#{target.adress_homestay}")
    String getAddressHomestay();

    @Value("#{target.payment_method}")
    Integer getPaymentMethod();

    @Value("#{target.address_user}")
    String getAddressUser();

}
