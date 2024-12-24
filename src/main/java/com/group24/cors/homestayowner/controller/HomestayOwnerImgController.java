package com.group24.cors.homestayowner.controller;


import com.group24.cors.common.base.ResponseObject;
import com.group24.cors.homestayowner.service.HomestayOwnerImgHomestayService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v2/img")
@RequiredArgsConstructor
@PreAuthorize("hasRole('OWNER')")
public class HomestayOwnerImgController {

    @Autowired
    private HomestayOwnerImgHomestayService homestayOwnerImgHomestayService;

    @GetMapping("")
    @PreAuthorize("hasAuthority('owner:read')")
    public ResponseObject getAllHomestayownerHomestay(@RequestParam("id") String id) {
        return new ResponseObject(homestayOwnerImgHomestayService.searchImgHomestay(id));
    }

    @PostMapping("/add-img-homestay")
    public ResponseObject getAddImgHomestay(@RequestParam("img")List<MultipartFile> img, @RequestParam("idHomestay") String idHomestay) throws IOException {
        return new ResponseObject(homestayOwnerImgHomestayService.AddImgHomestay(img,idHomestay));
    }

    @DeleteMapping("/delete-img-homestay")
    public ResponseObject getAddImgHomestay(@RequestParam("idImgHomestay") String id){
        return new ResponseObject(homestayOwnerImgHomestayService.deleteImghomestay(id));
    }

}
