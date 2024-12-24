package com.group24.cors.customer.model.response;

import com.group24.entities.ConvenientHomestay;
import org.springframework.beans.factory.annotation.Value;

import java.util.List;

public interface CustomerHomestayResponse {

    @Value("#{target.imageUrls}")
    List<ConvenientHomestay> getImageUrls();

}
