package com.group24.cors.customer.services;

import com.group24.cors.common.base.PageableObject;
import com.group24.cors.customer.model.request.CustomerBookingRequest;
import com.group24.cors.customer.model.request.CustomerCartRequest;
import com.group24.cors.customer.model.response.CustomerCartDetailResponse;
import com.group24.entities.Cart;

public interface CustomerCartService {

    PageableObject<CustomerCartDetailResponse> getAllHomestayInCart(CustomerCartRequest request);

    Cart addCart(CustomerCartRequest request);

    Boolean getOne(CustomerBookingRequest request);

}
