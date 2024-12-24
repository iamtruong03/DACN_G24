package com.group24.cors.admin.services.impl;

import com.group24.cors.admin.model.request.AdminHomestayRequest;
import com.group24.cors.admin.repository.AdminHomestayRepository;
import com.group24.cors.admin.repository.AdminLoginRepository;
import com.group24.cors.admin.services.AdminHomestayService;
import com.group24.cors.common.base.PageableObject;
import com.group24.entities.Admin;
import com.group24.entities.Homestay;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class AdminHomestayServiceImpl implements AdminHomestayService {

    @Autowired
    private AdminHomestayRepository adminHomestayRepository;

    @Autowired
    private AdminLoginRepository adminLoginRepository;

    @Override
    public PageableObject<Homestay> getAllHomestay(AdminHomestayRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<Homestay> adminHomestayResponse = adminHomestayRepository.getAllHomestay(pageable, request);
        return new PageableObject<>(adminHomestayResponse);
    }

    @Override
    public Admin getAdminByToken(String token) {
        return adminLoginRepository.findAdminByToken(token);
    }

    @Override
    public Integer getCountHoatDong() {
        return adminHomestayRepository.countHoatDong();
    }

    @Override
    public Integer getCountChoDuyet() {
        return adminHomestayRepository.countChoDuyet();
    }


}
