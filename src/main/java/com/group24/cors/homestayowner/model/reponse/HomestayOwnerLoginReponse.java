package com.group24.cors.homestayowner.model.reponse;

import org.springframework.beans.factory.annotation.Value;

public interface HomestayOwnerLoginReponse {

    @Value("#{target.code}")
    String getCode();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.email}")
    String getEmail();

    @Value("#{target.password}")
    String getPassword();

    @Value("#{target.username}")
    String getUsername();

    @Value("#{target.status}")
    String getStatus();

}
