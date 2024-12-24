package com.group24.cors.admin.services;

import com.group24.cors.admin.model.request.AdminConvenientHomestayRequest;
import com.group24.cors.admin.model.request.AdminConvenientHomestayTypeRequest;
import com.group24.cors.admin.model.response.AdminConvenientHomestayResponse;
import com.group24.cors.common.base.PageableObject;
import com.group24.entities.ConvenientHomestay;
import com.group24.entities.ConvenientHomestayType;

import java.io.IOException;

public interface AdminConvenientHomestayService {

    PageableObject<ConvenientHomestay> getAllConvenient(AdminConvenientHomestayRequest request);

    PageableObject<ConvenientHomestayType> getAllConvenientType(AdminConvenientHomestayTypeRequest request);

    ConvenientHomestay addConvenientHomestay( AdminConvenientHomestayRequest adminConvenientHomestayRequest);

    ConvenientHomestayType addConvenientHomestayType(AdminConvenientHomestayTypeRequest adminConvenientHomestayTypeRequest);

    ConvenientHomestay updateConvenientHomestay( AdminConvenientHomestayRequest adminConvenientHomestayRequest);

    ConvenientHomestayType updateConvenientHomestayType(AdminConvenientHomestayTypeRequest adminConvenientHomestayTypeRequest);
}
