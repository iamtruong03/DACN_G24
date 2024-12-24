package com.group24.cors.admin.services;

import com.group24.cors.admin.model.request.AdminHomestayRequest;
import com.group24.cors.common.base.PageableObject;
import com.group24.entities.Admin;
import com.group24.entities.Homestay;

public interface AdminHomestayService {

    PageableObject<Homestay> getAllHomestay(AdminHomestayRequest request);

    Admin getAdminByToken(String token);

    Integer getCountHoatDong();

    Integer getCountChoDuyet();
}
