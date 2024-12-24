package com.group24.cors.admin.controller;

import com.group24.cors.admin.model.request.AdminConvenientHomestayRequest;
import com.group24.cors.admin.model.request.AdminConvenientHomestayTypeRequest;
import com.group24.cors.admin.services.AdminConvenientHomestayService;
import com.group24.cors.common.base.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v3/convenient-homestay")
public class AdminConvenientHomestayController {

    @Autowired
    private AdminConvenientHomestayService adminConvenientHomestayService;

    @GetMapping()
    public ResponseObject getAllConvenient(AdminConvenientHomestayRequest adminConvenientHomestayRequest){
        return new ResponseObject(adminConvenientHomestayService.getAllConvenient(adminConvenientHomestayRequest));
    }

    @GetMapping("/type")
    public ResponseObject getAllConvenientType(AdminConvenientHomestayTypeRequest adminConvenientHomestayTypeRequest){
        return new ResponseObject(adminConvenientHomestayService.getAllConvenientType(adminConvenientHomestayTypeRequest));
    }

    @PostMapping("/add-convenient-type")
    public ResponseObject addConvenientType(@RequestBody AdminConvenientHomestayTypeRequest adminConvenientHomestayTypeRequest) {
        return new ResponseObject(adminConvenientHomestayService.addConvenientHomestayType(adminConvenientHomestayTypeRequest));
    }

    @PostMapping("/add-convenient")
    public ResponseObject addConvenient( @RequestBody  AdminConvenientHomestayRequest adminConvenientHomestayRequest) {
        return new ResponseObject(adminConvenientHomestayService.addConvenientHomestay(adminConvenientHomestayRequest));
    }

    @PutMapping("/update-convenient-type")
    public ResponseObject updateConvenientType(@RequestBody AdminConvenientHomestayTypeRequest adminConvenientHomestayTypeRequest) {
        return new ResponseObject(adminConvenientHomestayService.updateConvenientHomestayType(adminConvenientHomestayTypeRequest));
    }

    @PutMapping("/update-convenient")
    public ResponseObject updateConvenient(@RequestBody  AdminConvenientHomestayRequest adminConvenientHomestayRequest) {
        return new ResponseObject(adminConvenientHomestayService.updateConvenientHomestay(adminConvenientHomestayRequest));
    }
}