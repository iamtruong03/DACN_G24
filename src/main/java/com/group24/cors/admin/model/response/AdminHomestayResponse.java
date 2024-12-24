package com.group24.cors.admin.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.util.List;

public interface AdminHomestayResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.address}")
    String getAddress();

    @Value("#{target.price}")
    String getPrice();

    @Value("#{target.startDate}")
    String getStartDate();

    @Value("#{target.numberPerson}")
    String getNumberPerson();

    @Value("#{target.status}")
    String getStatus();

    @Value("#{target.imageUrls}")
    List<String> getImageUrls();

    @Value("#{target.name_homestay}")
    String getOwnerHomestayName();

    @Value("#{target.phone_number}")
    String getOwnerHomestayPhoneNumber();

    @Value("#{target.email}")
    String getOwnerHomestayEmail();
}
