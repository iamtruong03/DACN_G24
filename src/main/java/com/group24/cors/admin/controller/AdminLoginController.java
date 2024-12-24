package com.group24.cors.admin.controller;

import com.group24.cors.admin.model.request.AdminLoginRequest;
import com.group24.cors.admin.model.request.AdminRequest;
import com.group24.cors.admin.model.request.AdminUserPasswordRequest;
import com.group24.cors.admin.model.response.AdminLoginResponse;
import com.group24.cors.admin.services.AdminLoginService;
import com.group24.cors.common.base.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v3/login")
public class AdminLoginController {

    @Autowired
    private AdminLoginService adminLoginService;

    @PostMapping("")
    public AdminLoginResponse getAdLogin(@RequestBody AdminLoginRequest adminLoginRequest){
        return adminLoginService.getAdLogin(adminLoginRequest);
    }

    @PostMapping("/authenticate")
    public ResponseObject authenticate(@RequestBody AdminUserPasswordRequest request){
        return new ResponseObject(adminLoginService.authenticate(request));
    }

    @PostMapping("/registers")
    public ResponseObject registers(@RequestBody AdminRequest request){
        return new ResponseObject(adminLoginService.register(request));
    }

}
