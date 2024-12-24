package com.group24.cors.admin.controller;

import com.group24.cors.admin.model.request.AdminBookingRequest;
import com.group24.cors.admin.model.request.AdminStatisticalRequest;
import com.group24.cors.admin.model.request.AdminStatisticalTop5Request;
import com.group24.cors.admin.services.impl.AdminStatisticalServiceImpl;
import com.group24.cors.common.base.ResponseObject;
import com.group24.cors.homestayowner.model.request.HomestayOwnerStatisticalRequest;
import com.group24.cors.homestayowner.model.request.HomestayOwnerTop5StatisticalRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v3/statistical")
public class AdminStatisticalController {

    @Autowired
    private AdminStatisticalServiceImpl adminStatisticalService;

    @GetMapping()
    public ResponseObject getAll(@RequestParam("id") String id) {
        return new ResponseObject(adminStatisticalService.getStatistical(id));
    }

    @GetMapping("/month-and-year")
    public ResponseObject getMonthAndYear(final AdminStatisticalRequest request) {
        return new ResponseObject(adminStatisticalService.getStatisticalbyMonthAndYear(request));
    }

    @GetMapping("/year")
    public ResponseObject getYear(final AdminStatisticalRequest request) {
        return new ResponseObject(adminStatisticalService.getAllStatisticalForAllMonthsInYear(request));
    }

    @GetMapping("/top5")
    public ResponseObject getTop5(final AdminStatisticalTop5Request request) {
        return new ResponseObject(adminStatisticalService.getTop5HomestayInYear(request));
    }

}
