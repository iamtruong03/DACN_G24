package com.group24.cors.homestayowner.service;

import com.group24.cors.homestayowner.model.reponse.HomestayOwnerStatisticalReponse;
import com.group24.cors.homestayowner.model.reponse.HomestayOwnerStatisticalTop5Reponse;
import com.group24.cors.homestayowner.model.request.HomestayOwnerStatisticalRequest;
import com.group24.cors.homestayowner.model.request.HomestayOwnerTop5StatisticalRequest;

import java.util.List;

public interface HomestayOwnerStatisticalServie {

    HomestayOwnerStatisticalReponse getStatistical(String id);

    HomestayOwnerStatisticalReponse getStatisticalbyMonthAndYear(HomestayOwnerStatisticalRequest request);

    List<HomestayOwnerStatisticalReponse> getAllStatisticalForAllMonthsInYear(HomestayOwnerStatisticalRequest request);

    List<HomestayOwnerStatisticalTop5Reponse> getTop5HomestayInYear(HomestayOwnerTop5StatisticalRequest request);

}
