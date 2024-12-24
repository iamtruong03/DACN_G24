package com.group24.cors.homestayowner.controller;

import com.group24.cors.common.base.ResponseObject;
import com.group24.cors.homestayowner.model.request.HomestayOwnerStatisticalRequest;
import com.group24.cors.homestayowner.model.request.HomestayOwnerTop5StatisticalRequest;
import com.group24.cors.homestayowner.service.HomestayOwnerStatisticalServie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v2/statictical")
@PreAuthorize("hasRole('OWNER')")
public class HomestayOwnerStatisticalController {

    @Autowired
    private HomestayOwnerStatisticalServie homestayOwnerStatisticalServie;

    @GetMapping()
    @PreAuthorize("hasAuthority('owner:read')")
    public ResponseObject getAll(@RequestParam("id") String id) {
        return new ResponseObject(homestayOwnerStatisticalServie.getStatistical(id));
    }

    @GetMapping("/month-and-year")
    @PreAuthorize("hasAuthority('owner:read')")
    public ResponseObject getMonthAndYear(final HomestayOwnerStatisticalRequest request) {
        return new ResponseObject(homestayOwnerStatisticalServie.getStatisticalbyMonthAndYear(request));
    }

    @GetMapping("/year")
    @PreAuthorize("hasAuthority('owner:read')")
    public ResponseObject getYear(final HomestayOwnerStatisticalRequest request) {
        return new ResponseObject(homestayOwnerStatisticalServie.getAllStatisticalForAllMonthsInYear(request));
    }

    @GetMapping("/top5")
    public ResponseObject getTop5(final HomestayOwnerTop5StatisticalRequest request) {
        return new ResponseObject(homestayOwnerStatisticalServie.getTop5HomestayInYear(request));
    }

}
