package com.group24.cors.customer.services.impl;

import com.group24.cors.common.base.PageableObject;
import com.group24.cors.customer.model.request.CustomerConvenientHomestayRequest;
import com.group24.cors.customer.repository.CustomerConvenientHomestayRepository;
import com.group24.cors.customer.services.CustomerConvenientHomestayService;
import com.group24.entities.ConvenientHomestay;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerConvenientHomestayServiceImpl implements CustomerConvenientHomestayService {

    @Autowired
    private CustomerConvenientHomestayRepository customerConvenientHomestayRepository;

    @Override
    public PageableObject<ConvenientHomestay> getAllConvenient(CustomerConvenientHomestayRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<ConvenientHomestay> res = customerConvenientHomestayRepository.findAll(pageable);
        return new PageableObject<>(res);
    }

    @Override
    public List<ConvenientHomestay> getAllByConvenientType(CustomerConvenientHomestayRequest request) {
        return customerConvenientHomestayRepository.getAllConvenientHomestayType(request);
    }

}
