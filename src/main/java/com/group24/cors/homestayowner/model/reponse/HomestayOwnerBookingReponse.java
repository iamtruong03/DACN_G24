package com.group24.cors.homestayowner.model.reponse;


import org.springframework.beans.factory.annotation.Value;

public interface HomestayOwnerBookingReponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.userName}")
    String getUser();

    @Value("#{target.homestay}")
    String getHomestay();

    @Value("#{target.total_price}")
    String getTotalPrice();

    @Value("#{target.startDate}")
    String getStartDate();

    @Value("#{target.endDate}")
    String getEndDate();

    @Value("#{target.status}")
    String getStatus();

}
