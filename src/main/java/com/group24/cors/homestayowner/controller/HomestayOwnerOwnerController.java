package com.group24.cors.homestayowner.controller;

import com.group24.cors.common.base.ResponseObject;
import com.group24.cors.homestayowner.model.conventer.HomestayOwnerOwnerConventer;
import com.group24.cors.homestayowner.model.request.loginrequest.HomestayOwnerOwnerHomestayRequest;
import com.group24.cors.homestayowner.service.HomestayOwnerLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v2/owner")
@PreAuthorize("hasRole('OWNER')")
public class HomestayOwnerOwnerController {

    @Autowired
    private HomestayOwnerLoginService homestayownerLoginService;

    @Autowired
    private HomestayOwnerOwnerConventer conventer;


    @PutMapping("/update-information-owner")
    @PreAuthorize("hasAuthority('owner:update')")
    public ResponseObject updateInformationOwners(final HomestayOwnerOwnerHomestayRequest request, @RequestParam("id") String idOwner) throws IOException {
        return new ResponseObject(homestayownerLoginService.updateInformationOwner(idOwner,request));
    }
}
