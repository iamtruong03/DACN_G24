package com.group24.cors.customer.services;

import com.group24.cors.common.base.PageableObject;
import com.group24.cors.customer.model.request.CustomerHomestayRequest;
import com.group24.entities.Homestay;
import com.group24.entities.User;

public interface CustomerHomestayService {

    PageableObject<Homestay> getListHomestay(CustomerHomestayRequest request);

    Homestay getHomestayById(CustomerHomestayRequest request);

    PageableObject<Homestay> findAllBetweenDate(CustomerHomestayRequest request);

    User getCustomerByToken(String token);

    PageableObject<Homestay> searchHomestayByPromotion(CustomerHomestayRequest request);

}
