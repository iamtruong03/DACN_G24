package com.group24.cors.admin.services;

import com.group24.cors.admin.model.request.AdminPromotionRequest;
import com.group24.cors.admin.model.response.AdminPromotionResponse;
import com.group24.cors.common.base.PageableObject;
import com.group24.entities.Promotion;

public interface AdminPromotionService {

    PageableObject<Promotion> getAll(AdminPromotionRequest request);

    Promotion update();
}
