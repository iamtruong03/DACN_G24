package com.group24.cors.customer.model.response;

import com.group24.entities.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface CustomerCartDetailResponse extends IsIdentified {

    @Value("#{target.start_date}")
    String getStartDate();

    @Value("#{target.end_date}")
    String getEndDate();

    @Value("#{target.status}")
    String getStatus();

    @Value("#{target.id_homestay}")
    String getIdHomestay();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.price}")
    String getPrice();

    @Value("#{target.number_person}")
    String getNumberPerson();

    @Value("#{target.point}")
    String getPoint();

    @Value("#{target.address}")
    String getAddress();

    @Value("#{target.description}")
    String getDesc();

    @Value("#{target.email}")
    String getEmail();

    @Value("#{target.acreage}")
    String getAcreage();

    @Value("#{target.image}")
    String getImage();

    @Value("#{target.promotion_value}")
    String getValuePromotion();

    @Value("#{target.quantity_cmt}")
    Integer getQuantityCmt();

}
