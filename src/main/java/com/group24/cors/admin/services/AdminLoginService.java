package com.group24.cors.admin.services;

import com.group24.cors.admin.model.request.AdminLoginRequest;
import com.group24.cors.admin.model.request.AdminPassRequest;
import com.group24.cors.admin.model.request.AdminRequest;
import com.group24.cors.admin.model.request.AdminUserPasswordRequest;
import com.group24.cors.admin.model.response.AdminAuthenticationReponse;
import com.group24.cors.admin.model.response.AdminLoginResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;

public interface AdminLoginService {

    AdminLoginResponse getAdLogin(AdminLoginRequest adminLoginRequest);

    AdminAuthenticationReponse register(AdminRequest request);

    AdminAuthenticationReponse authenticate(AdminUserPasswordRequest request);

    AdminAuthenticationReponse changePassword(AdminPassRequest request, Principal connecteUser);

    AdminAuthenticationReponse updateInformation (String idAmin, AdminLoginRequest request, MultipartFile multipartFile) throws IOException;

}
