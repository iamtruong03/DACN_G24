package com.group24.cors.customer.services;

import com.group24.cors.customer.model.request.CustomerImgHomestayRequest;
import com.group24.entities.ImgHomestay;

import java.util.List;

public interface CustomerImgHomestayService {

    List<ImgHomestay> getImgHomestayByHomestayId(CustomerImgHomestayRequest request);

}
