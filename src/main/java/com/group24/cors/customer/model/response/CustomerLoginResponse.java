package com.group24.cors.customer.model.response;

import com.group24.entities.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface CustomerLoginResponse extends IsIdentified {

    @Value("#{target.status}")
    Integer getStatus();

    @Value("#{target.code}")
    String getCode();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.password}")
    String getPass();

    @Value("#{target.username}")
    String getUname();

    @Value("#{target.phone_number}")
    String getPhone_Number();

    @Value("#{target.email}")
    String getEmail();

}
