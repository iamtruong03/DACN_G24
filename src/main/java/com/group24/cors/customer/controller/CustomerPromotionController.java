package com.group24.cors.customer.controller;

import com.group24.cors.common.base.ResponseObject;
import com.group24.cors.customer.services.CustomerPromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/promotion")
public class CustomerPromotionController {

    @Autowired
    private CustomerPromotionService customerPromotionService;

    @GetMapping()
    public ResponseObject getAllPromotion() {
        return new ResponseObject(customerPromotionService.getAll());
    }

}
