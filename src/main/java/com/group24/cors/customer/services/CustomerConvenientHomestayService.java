package com.group24.cors.customer.services;

import com.group24.cors.common.base.PageableObject;
import com.group24.cors.customer.model.request.CustomerConvenientHomestayRequest;
import com.group24.entities.ConvenientHomestay;

import java.util.List;

public interface CustomerConvenientHomestayService {

    PageableObject<ConvenientHomestay> getAllConvenient(CustomerConvenientHomestayRequest request);

    List<ConvenientHomestay> getAllByConvenientType(CustomerConvenientHomestayRequest request);
}
