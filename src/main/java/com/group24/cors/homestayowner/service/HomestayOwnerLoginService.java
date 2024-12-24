package com.group24.cors.homestayowner.service;

import com.group24.cors.homestayowner.model.reponse.loginreponse.HomestayOwnerAuthenticationReponse;
import com.group24.cors.homestayowner.model.request.loginrequest.HomestayOwnerOwnerHomestayRequest;
import com.group24.cors.homestayowner.model.request.loginrequest.HomestayOwnerPasswordRequest;
import com.group24.cors.homestayowner.model.request.loginrequest.HomestayOwnerUsenamePasswordRequest;

import java.io.IOException;
import java.security.Principal;

public interface HomestayOwnerLoginService {

    HomestayOwnerAuthenticationReponse register(HomestayOwnerOwnerHomestayRequest homestayOwnerOwnerHomestayRequest);

    HomestayOwnerAuthenticationReponse authenticate(HomestayOwnerUsenamePasswordRequest request);

    HomestayOwnerAuthenticationReponse changePassword(HomestayOwnerPasswordRequest request, Principal connecteUser);

    HomestayOwnerAuthenticationReponse updateInformationOwner(String idOwner, HomestayOwnerOwnerHomestayRequest request) throws IOException;

    void confirmEmail(String code);

}
