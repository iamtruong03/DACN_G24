package com.group24.cors.customer.services.impl;

import com.group24.cors.customer.model.request.CustomerImgHomestayRequest;
import com.group24.cors.customer.repository.CustomerImgHomestayRepository;
import com.group24.cors.customer.services.CustomerImgHomestayService;
import com.group24.entities.ImgHomestay;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerImgHomestayServiceImpl implements CustomerImgHomestayService {

    @Autowired
    private CustomerImgHomestayRepository customerImgHomestayRepository;

    @Override
    public List<ImgHomestay> getImgHomestayByHomestayId(CustomerImgHomestayRequest request) {
        return customerImgHomestayRepository.getImgHomestayByIdHomestay(request);
    }

}
