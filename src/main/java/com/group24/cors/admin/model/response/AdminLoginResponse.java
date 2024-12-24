package com.group24.cors.admin.model.response;

import com.group24.entities.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface AdminLoginResponse {

    @Value("#{target.status}")
    Integer getStatus();

    @Value("#{target.code}")
    String getCode();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.password}")
    String getPass();

    @Value("#{target.username}")
    String getUsername();

}
