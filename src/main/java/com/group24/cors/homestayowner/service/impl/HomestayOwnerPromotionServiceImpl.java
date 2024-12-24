package com.group24.cors.homestayowner.service.impl;

import com.group24.cors.common.base.PageableObject;
import com.group24.cors.homestayowner.model.request.HomestayOwnerPromotionRequest;
import com.group24.cors.homestayowner.model.request.HomestayOwnerPromotionSearchRequest;
import com.group24.cors.homestayowner.repository.HomestayOwnerHomestayRepository;
import com.group24.cors.homestayowner.repository.HomestayOwnerOwnerHomestayRepository;
import com.group24.cors.homestayowner.repository.HomestayOwnerPromotionRepository;
import com.group24.cors.homestayowner.service.HomestayOwnerPromotionService;
import com.group24.entities.Booking;
import com.group24.entities.Homestay;
import com.group24.entities.Promotion;
import com.group24.infrastructure.contant.StatusPromotion;
import com.group24.infrastructure.exception.rest.RestApiException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
public class HomestayOwnerPromotionServiceImpl implements HomestayOwnerPromotionService {

    @Autowired
    private HomestayOwnerPromotionRepository homestayOwnerPromotionRepository;

    @Autowired
    private HomestayOwnerHomestayRepository homestayOwnerHomestayRepository;

    @Autowired
    private HomestayOwnerOwnerHomestayRepository homestayOwnerOwnerHomestayRepository;

    @Override
    public List<Promotion> getPromotion(String idOwner) {
        return homestayOwnerPromotionRepository.getAllPromotion(idOwner);
    }

    @Override
    public PageableObject<Promotion> searchPromotionByNameAndStatus(HomestayOwnerPromotionSearchRequest request) {
        List<Promotion> promotions=homestayOwnerPromotionRepository.findByEndDateLessThanAndStatusPromotion();
        if (promotions!=null){
        for (Promotion promotion: promotions){
            promotion.setStatusPromotion(StatusPromotion.KET_THUC);
            homestayOwnerPromotionRepository.save(promotion);
        }
        }
        List<Promotion> promotiond=homestayOwnerPromotionRepository.findByStartDateLessThanAndStatusPromotion();
        if (promotiond!=null){
            for (Promotion promotion: promotiond){
                promotion.setStatusPromotion(StatusPromotion.HOAT_DONG);
                homestayOwnerPromotionRepository.save(promotion);
            }
        }
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<Promotion> getPromotion = homestayOwnerPromotionRepository.getBookingByNameAndStatus(request, pageable);
        return new PageableObject<>(getPromotion);
    }

    @Override
    public Promotion addPromotion(HomestayOwnerPromotionRequest request) throws IOException {
        if (isNullOrEmpty(request.getName())) {
            throw new RestApiException("Tên không được để trống");
        }

        if (request.getStartDate() <= 0 || request.getEndDate() <= 0) {
            throw new RestApiException("Ngày bắt đầu và ngày kết thúc không được nhỏ hơn 0");
        }

        if (request.getEndDate() < request.getStartDate()) {
            throw new RestApiException("Ngày kết thúc không được nhỏ hơn ngày bắt đầu");
        }

        if (request.getValue() <= 0) {
            throw new RestApiException("Value không được để trống");
        }

        if (homestayOwnerPromotionRepository.existsByName(request.getName())) {
            throw new RestApiException("tên không được trùng");
        }
        Promotion promotion=new Promotion();
        promotion.setName(request.getName());
        promotion.setStartDate(request.getStartDate());
        promotion.setEndDate(request.getEndDate());
        promotion.setType(request.getType());
        promotion.setValue(request.getValue());
        promotion.setIdOwnerHomestay(homestayOwnerOwnerHomestayRepository.findById(request.getOwner()).get());
        promotion.setStatusPromotion(StatusPromotion.CHO_HOAT_DONG);
        Promotion promotion1=homestayOwnerPromotionRepository.save(promotion);
        for (String homestay: request.getHomestay()){
            Homestay homestay1=homestayOwnerHomestayRepository.findById(homestay).orElse(null);
            homestay1.setPromotion(promotion1);
            homestayOwnerHomestayRepository.save(homestay1);
        }
        return promotion1;
    }



    @Override
    public Promotion updatePromotion(String idPromotion,HomestayOwnerPromotionRequest request) throws IOException{
        if (isNullOrEmpty(request.getName())) {
            throw new RestApiException("Tên không được để trống");
        }

        if (request.getStartDate() <= 0 || request.getEndDate() <= 0) {
            throw new RestApiException("Ngày bắt đầu và ngày kết thúc không được nhỏ hơn 0");
        }

        if (request.getEndDate() <= request.getStartDate()) {
            throw new RestApiException("Ngày kết thúc không được nhỏ hơn ngày bắt đầu");
        }

        if (request.getValue() <= 0) {
            throw new RestApiException("Value không được để trống");
        }

        Promotion promotion= homestayOwnerPromotionRepository.findById(idPromotion).orElseThrow();

        if (homestayOwnerPromotionRepository.existsByName(request.getName()) && !promotion.getName().equals(request.getName())) {
            throw new RestApiException("Tên đã được sử dụng");
        }
        promotion.setName(request.getName());
        promotion.setStartDate(request.getStartDate());
        promotion.setEndDate(request.getEndDate());
        promotion.setType(request.getType());
        promotion.setValue(request.getValue());
        Promotion promotion1=homestayOwnerPromotionRepository.save(promotion);
        List<Homestay> homestayList=homestayOwnerHomestayRepository.getHomestayByPromotion(idPromotion);
        for (Homestay homestay: homestayList){
            homestay.setPromotion(null);
            homestayOwnerHomestayRepository.save(homestay);
        }
        for (String homestay: request.getHomestay()){
            Homestay homestay1=homestayOwnerHomestayRepository.findById(homestay).orElse(null);
            homestay1.setPromotion(promotion1);
            homestayOwnerHomestayRepository.save(homestay1);
        }
        return promotion1;
    }

    @Override
    public Promotion updatePromotionStatus(String idPromotion) throws IOException {
        Promotion promotion= homestayOwnerPromotionRepository.findById(idPromotion).orElseThrow();
        promotion.setStatusPromotion(StatusPromotion.KET_THUC);
        Promotion promotion1=homestayOwnerPromotionRepository.save(promotion);
        return promotion1;
    }

    public static boolean isNullOrEmpty(String str) {
        return str == null || str.trim().isEmpty();
    }


}
