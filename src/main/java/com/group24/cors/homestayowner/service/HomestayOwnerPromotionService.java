package com.group24.cors.homestayowner.service;

import com.group24.cors.common.base.PageableObject;
import com.group24.cors.homestayowner.model.request.HomestayOwnerPromotionRequest;
import com.group24.cors.homestayowner.model.request.HomestayOwnerPromotionSearchRequest;
import com.group24.entities.Promotion;
import org.springframework.data.domain.Page;

import java.io.IOException;
import java.util.List;

public interface HomestayOwnerPromotionService {

       List<Promotion> getPromotion(String idOwner);

       PageableObject<Promotion> searchPromotionByNameAndStatus(HomestayOwnerPromotionSearchRequest request);

       Promotion addPromotion(HomestayOwnerPromotionRequest request) throws IOException;

       Promotion updatePromotion(String idPromotion,HomestayOwnerPromotionRequest request) throws IOException;

       Promotion updatePromotionStatus(String idPromotion) throws IOException;

}
