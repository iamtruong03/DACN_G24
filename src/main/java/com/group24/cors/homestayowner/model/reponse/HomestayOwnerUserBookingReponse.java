package com.group24.cors.homestayowner.model.reponse;


import org.springframework.beans.factory.annotation.Value;

public interface HomestayOwnerUserBookingReponse {

    @Value("#{target.name}")
    String getName();

    @Value("#{target.address}")
    String getAddress();

    @Value("#{target.birthday}")
    String getBirthday();

    @Value("#{target.email}")
    String getEmail();

    @Value("#{target.gender}")
    String getGender();

    @Value("#{target.phone_number}")
    String getPhoneNumber();

    @Value("#{target.soLuot}")
    Long getSoLuot();

}
