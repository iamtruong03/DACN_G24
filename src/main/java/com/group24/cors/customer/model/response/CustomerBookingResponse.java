package com.group24.cors.customer.model.response;

import com.group24.entities.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface CustomerBookingResponse extends IsIdentified {

    @Value("#{target.user_name}")
    String getUser_Name();

    @Value("#{target.homestay_name}")
    String getHomestay_Name();

    @Value("#{target.status}")
    String getStatus();

    @Value("#{target.created_date}")
    String getCreated_Date();

    @Value("#{target.start_date}")
    String getStart_Date();

    @Value("#{target.end_date}")
    String getEnd_Date();

    @Value("#{target.total_price}")
    String getTotal_Price();

}
