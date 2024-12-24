package com.group24.cors.customer.services.impl;

import com.group24.cors.customer.repository.CustomerPromotionRepository;
import com.group24.cors.customer.services.CustomerPromotionService;
import com.group24.entities.Promotion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerPromotionServiceImpl implements CustomerPromotionService {

    @Autowired
    private CustomerPromotionRepository customerPromotionRepository;

    @Override
    public List<Promotion> getAll() {
        return customerPromotionRepository.findAll();
    }

}
