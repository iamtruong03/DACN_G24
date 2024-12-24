package com.group24.cors.admin.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface AdminStatisticalReponse {

    @Value("#{target.DoanhSo}")
    String getDoanhSo();

    @Value("#{target.TongSoTien}")
    String getTongSoTien();

}
