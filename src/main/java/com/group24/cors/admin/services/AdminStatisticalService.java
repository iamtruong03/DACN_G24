package com.group24.cors.admin.services;

import com.group24.cors.admin.model.request.AdminStatisticalRequest;
import com.group24.cors.admin.model.request.AdminStatisticalTop5Request;
import com.group24.cors.admin.model.response.AdminStatisticalReponse;
import com.group24.cors.admin.model.response.AdminStatisticalTop5Response;
import com.group24.cors.homestayowner.model.reponse.HomestayOwnerStatisticalReponse;
import com.group24.cors.homestayowner.model.reponse.HomestayOwnerStatisticalTop5Reponse;
import com.group24.cors.homestayowner.model.request.HomestayOwnerStatisticalRequest;
import com.group24.cors.homestayowner.model.request.HomestayOwnerTop5StatisticalRequest;

import java.util.List;

public interface AdminStatisticalService {

    AdminStatisticalReponse getStatistical(String id);

    AdminStatisticalReponse getStatisticalbyMonthAndYear(AdminStatisticalRequest request);

    List<AdminStatisticalReponse> getAllStatisticalForAllMonthsInYear(AdminStatisticalRequest request);

    List<AdminStatisticalTop5Response> getTop5HomestayInYear(AdminStatisticalTop5Request request);

}
