package com.group24.cors.homestayowner.controller;

import com.group24.cors.common.base.ResponseObject;
import com.group24.cors.homestayowner.model.request.HomestayOwnerPromotionRequest;
import com.group24.cors.homestayowner.model.request.HomestayOwnerPromotionSearchRequest;
import com.group24.cors.homestayowner.service.HomestayOwnerPromotionService;
import com.group24.entities.Promotion;
import com.group24.infrastructure.exception.rest.RestApiException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v2/promotion")
public class HomestayOwnerPromotionController {

    @Autowired
    private HomestayOwnerPromotionService homestayOwnerPromotionService;

    @GetMapping()
    public ResponseObject getPromotion(@RequestParam("idOwner") String idOwner) {
        return new ResponseObject(homestayOwnerPromotionService.getPromotion(idOwner));
    }

    @GetMapping("/search")
    public ResponseObject searchPromotion(final HomestayOwnerPromotionSearchRequest request){
        return new ResponseObject(homestayOwnerPromotionService.searchPromotionByNameAndStatus(request));
    }

    @PostMapping("/add-promotion")
    public ResponseObject addPromotion(@RequestBody HomestayOwnerPromotionRequest request) throws IOException {
        try {
            Promotion promotion = homestayOwnerPromotionService.addPromotion(request);
            ResponseObject responseObject = new ResponseObject(promotion);
            responseObject.setMessage("Thành công");
            return responseObject;
        } catch (RestApiException ex) {
            ResponseObject responseObject = new ResponseObject(null);
            responseObject.setMessage("Không thành công: " + ex.getMessage());
            return responseObject;
        }
    }

    @PutMapping("/update-promotion")
    public ResponseObject updatePromotion(@RequestParam("idPromotion") String id, @RequestBody HomestayOwnerPromotionRequest request) throws IOException {
        try {
            Promotion promotion = homestayOwnerPromotionService.updatePromotion(id, request);
            ResponseObject responseObject = new ResponseObject(promotion);
            responseObject.setMessage("Thành công");
            return responseObject;
        } catch (RestApiException ex) {
            ResponseObject responseObject = new ResponseObject(null);
            responseObject.setMessage("Không thành công: " + ex.getMessage());
            return responseObject;
        }
    }

    @PutMapping("/update-status-promotion")
    public ResponseObject deletePromotion(@RequestParam("idPromotion") String id) throws IOException {
        try {
            Promotion promotion = homestayOwnerPromotionService.updatePromotionStatus(id);
            ResponseObject responseObject = new ResponseObject(promotion);
            responseObject.setMessage("Thành công");
            return responseObject;
        } catch (RestApiException ex) {
            ResponseObject responseObject = new ResponseObject(null);
            responseObject.setMessage("Không thành công: " + ex.getMessage());
            return responseObject;
        }
    }

}
