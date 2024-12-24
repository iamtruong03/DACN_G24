package com.group24.cors.customer.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface CustomerPromotionResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.type}")
    String getType();

    @Value("#{target.start_date}")
    String getStart_date();

    @Value("#{target.end_date}")
    String getEnd_date();

    @Value("#{target.value}")
    String getValue();

}
