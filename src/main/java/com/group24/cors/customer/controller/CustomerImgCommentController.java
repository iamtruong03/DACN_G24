package com.group24.cors.customer.controller;

import com.group24.cors.common.base.ResponseObject;
import com.group24.cors.customer.model.request.CustomerImgCommentRequest;
import com.group24.cors.customer.services.CustomerImgCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/img-comment")
@PreAuthorize("hasRole('CUSTOMER')")
public class CustomerImgCommentController {

    @Autowired
    private CustomerImgCommentService customerImgCommentService;

    @GetMapping()
    public ResponseObject getImgCommentByCommentId(CustomerImgCommentRequest request) {
        return new ResponseObject(customerImgCommentService.getImgCommentByCommentId(request));
    }

}
