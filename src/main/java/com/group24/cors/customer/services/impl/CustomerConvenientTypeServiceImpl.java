package com.group24.cors.customer.services.impl;

import com.group24.cors.customer.repository.CustomerConvenientTypeRepository;
import com.group24.cors.customer.services.CustomerConvenientTypeService;
import com.group24.entities.ConvenientHomestayType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerConvenientTypeServiceImpl implements CustomerConvenientTypeService {

    @Autowired
    private CustomerConvenientTypeRepository customerConvenientTypeRepository;

    @Override
    public List<ConvenientHomestayType> getAll() {
        return customerConvenientTypeRepository.getAll();
    }
}
