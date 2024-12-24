package com.group24.cors.customer.controller;

import com.group24.cors.common.base.ResponseObject;
import com.group24.cors.customer.model.request.CustomerConvenientHomestayRequest;
import com.group24.cors.customer.services.CustomerConvenientHomestayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/convenient-homestay")
public class CustomerConvenientHomestayController {

    @Autowired
    private CustomerConvenientHomestayService customerConvenientHomestayService;

    @GetMapping()
    public ResponseObject getAllConvenient(CustomerConvenientHomestayRequest request) {
        return new ResponseObject(customerConvenientHomestayService.getAllConvenient(request));
    }

    @GetMapping("/get-by-convenient-type")
    public ResponseObject getAllByConvenientType(CustomerConvenientHomestayRequest request) {
        return new ResponseObject(customerConvenientHomestayService.getAllByConvenientType(request));
    }
}
