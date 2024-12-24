package com.group24.cors.customer.controller;

import com.group24.cors.common.base.ResponseObject;
import com.group24.cors.customer.model.request.CustomerCommentAddRequest;
import com.group24.cors.customer.model.request.CustomerCommentByUserRequest;
import com.group24.cors.customer.model.request.CustomerCommentRequest;
import com.group24.cors.customer.services.CustomerCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/comment")
public class CustomerCommentController {

    @Autowired
    private CustomerCommentService customerCommentService;

    @GetMapping()
    public ResponseObject getCommentByHomestay(CustomerCommentRequest request) {
        return new ResponseObject(customerCommentService.getCommentByHomestayId(request));
    }

    @GetMapping("/number-of-reviewers")
    public ResponseObject getNumberOfReviewers(CustomerCommentRequest request) {
        return new ResponseObject(customerCommentService.getNumberOfReviewers(request));
    }

    @GetMapping("/avg-point")
    public ResponseObject getAvgPoint(CustomerCommentRequest request) {
        return new ResponseObject(customerCommentService.getAvgPoint(request));
    }

    @PostMapping("/add-comment")
    public ResponseObject addComment(final CustomerCommentAddRequest request) throws IOException{
        return new ResponseObject(customerCommentService.addComment(request));
    }

    @GetMapping("/by-user")
    public ResponseObject getCommentByUserId(final CustomerCommentByUserRequest request){
        return new ResponseObject(customerCommentService.getCommentByUserId(request));
    }

}
