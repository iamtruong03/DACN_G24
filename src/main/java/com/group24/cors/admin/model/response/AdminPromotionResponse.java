package com.group24.cors.admin.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface AdminPromotionResponse {
    @Value("#{target.type}")
    String getType();

    @Value("#{target.value}")
    String getAddressName();

    @Value("#{target.start_date}")
    String getCreateDate();

    @Value("#{target.end_date}")
    String getEndDate();

    @Value("#{target.name}")
    String getName();

}
