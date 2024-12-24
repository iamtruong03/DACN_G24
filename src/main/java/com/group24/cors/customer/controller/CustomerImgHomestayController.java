package com.group24.cors.customer.controller;

import com.group24.cors.common.base.ResponseObject;
import com.group24.cors.customer.model.request.CustomerImgHomestayRequest;
import com.group24.cors.customer.services.CustomerImgHomestayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/img-homestay")
public class CustomerImgHomestayController {

    @Autowired
    private CustomerImgHomestayService customerImgHomestayService;

    @GetMapping
    public ResponseObject getImgHomestayByHomestayId(CustomerImgHomestayRequest request) {
        return new ResponseObject(customerImgHomestayService.getImgHomestayByHomestayId(request));
    }

}
