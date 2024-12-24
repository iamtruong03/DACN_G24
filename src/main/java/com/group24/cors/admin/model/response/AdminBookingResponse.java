package com.group24.cors.admin.model.response;

import com.group24.entities.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface AdminBookingResponse extends IsIdentified {

    @Value("#{target.stt}")
    String getStt();

    @Value("#{target.user_name}")
    String getUserName();

    @Value("#{target.status}")
    String getStatus();

    @Value("#{target.created_date}")
    Long getCreatedDate();

    @Value("#{target.start_date}")
    Long getStartDate();

    @Value("#{target.end_date}")
    Long getEndDate();

    @Value("#{target.total_price}")
    BigDecimal getTotalPrice();

    @Value("#{target.homestay_name}")
    String getHomestayName();

}
