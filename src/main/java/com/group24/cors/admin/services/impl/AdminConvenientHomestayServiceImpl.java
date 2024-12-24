package com.group24.cors.admin.services.impl;

import com.group24.cors.admin.model.request.AdminConvenientHomestayRequest;
import com.group24.cors.admin.model.request.AdminConvenientHomestayTypeRequest;
import com.group24.cors.admin.model.response.AdminConvenientHomestayResponse;
import com.group24.cors.admin.repository.AdminConvenientHomestayRepository;
import com.group24.cors.admin.repository.AdminConvenientHomestayTypeRespository;
import com.group24.cors.admin.services.AdminConvenientHomestayService;
import com.group24.cors.common.base.PageableObject;
import com.group24.entities.ConvenientHomestay;
import com.group24.entities.ConvenientHomestayType;
import com.group24.infrastructure.contant.Message;
import com.group24.infrastructure.exception.rest.RestApiException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;

@Service
public class AdminConvenientHomestayServiceImpl implements AdminConvenientHomestayService {

    @Autowired
    private AdminConvenientHomestayRepository adminConvenientHomestayRepository;

    @Autowired
    private AdminConvenientHomestayTypeRespository adminConvenientHomestayTypeRespository;


    @Override
    public PageableObject<ConvenientHomestay> getAllConvenient(AdminConvenientHomestayRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<ConvenientHomestay> res = adminConvenientHomestayRepository.getAllConvenientHomestay(pageable,request);
        return new PageableObject<>(res);
    }

    @Override
    public PageableObject<ConvenientHomestayType> getAllConvenientType(AdminConvenientHomestayTypeRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<ConvenientHomestayType> res = adminConvenientHomestayTypeRespository.getAllConvenientHomestayType(pageable,request);
        return new PageableObject<>(res);
    }

    @Override
    public ConvenientHomestay addConvenientHomestay( AdminConvenientHomestayRequest adminConvenientHomestayRequest){
        if (isNullOrEmpty(adminConvenientHomestayRequest.getName())) {
            throw new RestApiException("Name cannot be empty");
        }
        if (adminConvenientHomestayRepository.existsByName(adminConvenientHomestayRequest.getName())) {
            throw new RestApiException("Convenient already exist");
        }
        ConvenientHomestay convenientHomestay = new ConvenientHomestay();
        ConvenientHomestayType convenientHomestayType = adminConvenientHomestayTypeRespository.findById(adminConvenientHomestayRequest.getIdType()).orElse(null);
        convenientHomestay.setName(adminConvenientHomestayRequest.getName());
        convenientHomestay.setDesc(adminConvenientHomestayRequest.getDesc());
        convenientHomestay.setConvenientHomestayType(convenientHomestayType);
        ConvenientHomestay convenientHomestay1 = adminConvenientHomestayRepository.save(convenientHomestay);
        return convenientHomestay1;
    }

    @Override
    public ConvenientHomestayType addConvenientHomestayType(AdminConvenientHomestayTypeRequest adminConvenientHomestayTypeRequest) {
        if (isNullOrEmpty(adminConvenientHomestayTypeRequest.getNameType())) {
            throw new RestApiException("Name cannot be empty");
        }
        if (adminConvenientHomestayTypeRespository.existsByName(adminConvenientHomestayTypeRequest.getNameType())) {
            throw new RestApiException("ConvenientType already exist");
        }
        ConvenientHomestayType convenientHomestayType = new ConvenientHomestayType();
        convenientHomestayType.setName(adminConvenientHomestayTypeRequest.getNameType());
        convenientHomestayType.setDesc(adminConvenientHomestayTypeRequest.getDescType());
        ConvenientHomestayType convenientHomestayType1 = adminConvenientHomestayTypeRespository.save(convenientHomestayType);
        return convenientHomestayType1;
    }

    @Override
    public ConvenientHomestay updateConvenientHomestay(AdminConvenientHomestayRequest adminConvenientHomestayRequest) {
        ConvenientHomestay convenientHomestay = adminConvenientHomestayRepository.findById(adminConvenientHomestayRequest.getId()).orElse(null);
        if (isNullOrEmpty(adminConvenientHomestayRequest.getName())) {
            throw new RestApiException("Name cannot be empty");
        }
        if (!adminConvenientHomestayRequest.getName().equals(convenientHomestay.getName()) &&
                adminConvenientHomestayRepository.existsByName(adminConvenientHomestayRequest.getName())) {
            throw new RestApiException("Name Convenient already exists");
        }
        ConvenientHomestayType convenientHomestayType = adminConvenientHomestayTypeRespository.findById(adminConvenientHomestayRequest.getIdType()).orElse(null);
        convenientHomestay.setName(adminConvenientHomestayRequest.getName());
        convenientHomestay.setDesc(adminConvenientHomestayRequest.getDesc());
        convenientHomestay.setConvenientHomestayType(convenientHomestayType);
        ConvenientHomestay convenientHomestay1 = adminConvenientHomestayRepository.save(convenientHomestay);
        return convenientHomestay1;
    }

    @Override
    public ConvenientHomestayType updateConvenientHomestayType(AdminConvenientHomestayTypeRequest adminConvenientHomestayTypeRequest) {
        ConvenientHomestayType convenientHomestayType = adminConvenientHomestayTypeRespository.findById(adminConvenientHomestayTypeRequest.getId()).orElse(null);
        if (isNullOrEmpty(adminConvenientHomestayTypeRequest.getNameType())) {
            throw new RestApiException("Name cannot be empty");
        }
        if (!adminConvenientHomestayTypeRequest.getNameType().equals(convenientHomestayType.getName()) &&
                adminConvenientHomestayTypeRespository.existsByName(adminConvenientHomestayTypeRequest.getNameType())) {
            throw new RestApiException("Name ConvenientType already exists");
        }
        convenientHomestayType.setName(adminConvenientHomestayTypeRequest.getNameType());
        convenientHomestayType.setDesc(adminConvenientHomestayTypeRequest.getDescType());
        ConvenientHomestayType convenientHomestayType1 = adminConvenientHomestayTypeRespository.save(convenientHomestayType);
        return convenientHomestayType1;
    }

    public static boolean isNullOrEmpty(String str) {
        return str == null || str.trim().isEmpty();
    }


}
