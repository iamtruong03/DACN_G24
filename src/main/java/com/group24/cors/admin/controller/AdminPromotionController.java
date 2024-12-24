package com.group24.cors.admin.controller;

import com.group24.cors.admin.model.request.AdminPromotionRequest;
import com.group24.cors.admin.repository.AdminPromotionRepository;
import com.group24.cors.admin.services.AdminPromotionService;
import com.group24.cors.common.base.ResponseObject;
import com.group24.entities.Promotion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v3/promotion")
@PreAuthorize("hasRole('ADMIN')")
public class AdminPromotionController {

    @Autowired
    private AdminPromotionService adminPromotionService;

    @GetMapping("")
    @PreAuthorize("hasAuthority('admin:read')")
    public ResponseObject getAll(AdminPromotionRequest adminPromotionRequest){
        return new ResponseObject(adminPromotionService.getAll(adminPromotionRequest));
    }

}
