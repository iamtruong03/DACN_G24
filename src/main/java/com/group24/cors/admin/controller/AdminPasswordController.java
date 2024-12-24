package com.group24.cors.admin.controller;

import com.group24.cors.admin.model.request.AdminPassRequest;
import com.group24.cors.admin.services.AdminLoginService;
import com.group24.cors.common.base.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v3/change-pass")
public class AdminPasswordController {

    @Autowired
    private AdminLoginService changePassword;

    @PostMapping("/changePassword")
    public ResponseObject changePassword(@RequestBody AdminPassRequest request, Principal connecteUser){
        return new ResponseObject(changePassword.changePassword(request,connecteUser));
    }

}
