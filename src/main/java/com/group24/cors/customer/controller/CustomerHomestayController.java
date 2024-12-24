package com.group24.cors.customer.controller;

import com.group24.cors.common.base.ResponseObject;
import com.group24.cors.customer.model.request.CustomerHomestayRequest;
import com.group24.cors.customer.services.CustomerHomestayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/homestay")
public class CustomerHomestayController {

    @Autowired
    private CustomerHomestayService customerHomestayService;

    @GetMapping()
    public ResponseObject getListHotel(CustomerHomestayRequest request) {
        return new ResponseObject(customerHomestayService.getListHomestay(request));
    }

    @GetMapping("/getOne")
    public ResponseObject getHomestayById(CustomerHomestayRequest request) {
        return new ResponseObject(customerHomestayService.getHomestayById(request));
    }

    @GetMapping("/search")
    public ResponseObject search(CustomerHomestayRequest request) {
        return new ResponseObject(customerHomestayService.findAllBetweenDate(request));
    }

    @GetMapping("get-user-by-token")
    public ResponseObject getOwnerByToken(@RequestParam("token") String token) {
        return new ResponseObject(customerHomestayService.getCustomerByToken(token));
    }

    @GetMapping("/search-by-promotion")
    public ResponseObject searchByPromotion(CustomerHomestayRequest request) {
        return new ResponseObject(customerHomestayService.searchHomestayByPromotion(request));
    }

}
