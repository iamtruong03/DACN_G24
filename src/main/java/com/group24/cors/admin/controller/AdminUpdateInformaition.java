package com.group24.cors.admin.controller;

import com.group24.cors.admin.model.request.AdminLoginRequest;
import com.group24.cors.admin.services.AdminLoginService;
import com.group24.cors.common.base.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v3/information")
public class AdminUpdateInformaition {

    @Autowired
    private AdminLoginService adminLoginService;

    @PutMapping("/update")
    public ResponseObject updateInformationOwners(@RequestParam AdminLoginRequest adminLoginRequest, @RequestParam("id") String idAmin, @RequestParam("avataUrl") MultipartFile multipartFile) throws IOException {
        return new ResponseObject(adminLoginService.updateInformation(idAmin,adminLoginRequest,multipartFile));
    }
}
