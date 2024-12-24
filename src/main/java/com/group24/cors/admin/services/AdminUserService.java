package com.group24.cors.admin.services;

import com.group24.cors.admin.model.request.AdminConvenientHomestayRequest;
import com.group24.cors.admin.model.request.AdminUserRequest;
import com.group24.cors.common.base.PageableObject;
import com.group24.entities.ConvenientHomestay;
import com.group24.entities.User;

public interface AdminUserService {
    User adminApprovalUser(AdminUserRequest request);

    User adminRefuseUser(AdminUserRequest request);

    PageableObject<User> getAllUser(AdminUserRequest request);
}
