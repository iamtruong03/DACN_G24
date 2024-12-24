package com.group24.cors.admin.controller;

import com.group24.cors.admin.model.request.AdminBookingByHomestayRequest;
import com.group24.cors.admin.model.request.AdminBookingRequest;
import com.group24.cors.admin.services.AdminBookingService;
import com.group24.cors.common.base.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v3/booking")
public class AdminBookingController {

    @Autowired
    private AdminBookingService adminBookingService;

    @GetMapping()
    public ResponseObject getAll(final AdminBookingRequest adminBookingRequest) {
        return new ResponseObject(adminBookingService.getAllBooking(adminBookingRequest));
    }

    @GetMapping("/byid")
    public ResponseObject getAllBookingByHomestay( @RequestBody AdminBookingByHomestayRequest request) {
        return new ResponseObject(adminBookingService.getAllBookingByHomestay(request));
    }

    @PutMapping("/update-admin-trancode")
    public ResponseObject updateAdminCode(final AdminBookingRequest adminBookingRequest) {
        return new ResponseObject(adminBookingService.updateAdminTranCode(adminBookingRequest));
    }

    @PutMapping("/update-cancell-trancode")
    public ResponseObject updateCancellCode(final AdminBookingRequest adminBookingRequest) {
        return new ResponseObject(adminBookingService.updateCancellTranCode(adminBookingRequest));
    }

}