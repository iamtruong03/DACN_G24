package com.group24.cors.homestayowner.controller;

import com.group24.cors.common.base.ResponseObject;
import com.group24.cors.homestayowner.model.request.loginrequest.HomestayOwnerPasswordRequest;
import com.group24.cors.homestayowner.service.HomestayOwnerLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v2/change-pass")
@PreAuthorize("hasRole('OWNER')")
public class HomestayOwnerPassController {

    @Autowired
    private HomestayOwnerLoginService homestayownerLoginService;

    @PostMapping("/changePassword")
    @PreAuthorize("hasAuthority('owner:create')")
    public ResponseObject changePassword(@RequestBody HomestayOwnerPasswordRequest request, Principal connecteUser) {
        return new ResponseObject(homestayownerLoginService.changePassword(request, connecteUser));
    }

}
