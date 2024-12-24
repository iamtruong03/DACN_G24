package com.group24.cors.homestayowner.model.reponse;

import org.springframework.beans.factory.annotation.Value;

public interface HomestayOwnerStatisticalTop5Reponse {
    @Value("#{target.DoanhSo}")
    String getDoanhSo();

    @Value("#{target.TongSoTien}")
    String getTongSoTien();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.address}")
    String getAddress();

    @Value("#{target.roomNumber}")
    String getRoomNumber();
}
