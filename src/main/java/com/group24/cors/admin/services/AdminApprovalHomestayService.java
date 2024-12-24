package com.group24.cors.admin.services;

import com.group24.cors.admin.model.request.AdminApprovalRequest;
import com.group24.entities.Homestay;

public interface AdminApprovalHomestayService {

    Homestay adminApprovalHomestay(AdminApprovalRequest request);

    Homestay adminRefuseHomestay(AdminApprovalRequest request);

}
