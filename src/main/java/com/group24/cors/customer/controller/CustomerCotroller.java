package com.group24.cors.customer.controller;

import com.group24.cors.common.base.ResponseObject;
import com.group24.cors.customer.model.coventer.CustomerConventer;
import com.group24.cors.customer.model.request.CustomerRequest;
import com.group24.cors.customer.services.CustomerLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/customer")
public class CustomerCotroller {

    @Autowired
    private CustomerLoginService customerLoginService;

    @Autowired
    private CustomerConventer conventer;

    @PutMapping("/update-information-customer")
    public ResponseObject updateInformationCustomer(final CustomerRequest customerRequest, @RequestParam("id") String idCustomer) throws IOException {
        return new ResponseObject(customerLoginService.updateInformationCusmoter(idCustomer, customerRequest));
    }

}
