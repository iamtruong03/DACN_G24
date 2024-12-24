package com.group24.cors.admin.services.impl;

import com.group24.cors.admin.model.request.AdminStatisticalRequest;
import com.group24.cors.admin.model.request.AdminStatisticalTop5Request;
import com.group24.cors.admin.model.response.AdminStatisticalReponse;
import com.group24.cors.admin.model.response.AdminStatisticalTop5Response;
import com.group24.cors.admin.repository.AdminBookingRepository;
import com.group24.cors.admin.services.AdminStatisticalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminStatisticalServiceImpl implements AdminStatisticalService {

    @Autowired
    private AdminBookingRepository adminBookingRepository;


    @Override
    public AdminStatisticalReponse getStatistical(String id) {
        return adminBookingRepository.getStatistical(id);
    }

    @Override
    public AdminStatisticalReponse getStatisticalbyMonthAndYear(AdminStatisticalRequest request) {
        return adminBookingRepository.getAllStatistical(request);
    }

    @Override
    public List<AdminStatisticalReponse> getAllStatisticalForAllMonthsInYear(AdminStatisticalRequest request) {
        List<AdminStatisticalReponse> responseList = new ArrayList<>();
        for (int i = 1; i <= 12; i++) {
            request.setYear(request.getYear());
            request.setMonth(i);
            responseList.add(adminBookingRepository.getAllStatisticalYear(request));
        }
        return responseList;
    }

    @Override
    public List<AdminStatisticalTop5Response> getTop5HomestayInYear(AdminStatisticalTop5Request request) {
        return adminBookingRepository.getTop5StaticalYear(request);
    }
}
