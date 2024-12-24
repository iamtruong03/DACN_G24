package com.group24.cors.homestayowner.service;

import com.group24.cors.common.base.PageableObject;
import com.group24.cors.homestayowner.model.reponse.HomestayOwnerConvenientReponse;
import com.group24.cors.homestayowner.model.reponse.HomestayOwnerHomestayReponse;
import com.group24.cors.homestayowner.model.request.HomestayownerHomestayRequest;

import java.util.List;

public interface HomestayOwnerConvenientSerivce {

    List<HomestayOwnerConvenientReponse> getHomestayOwnerConvenientHomestay();

    PageableObject<HomestayOwnerHomestayReponse> getPageablebyConvenient(String id,HomestayownerHomestayRequest homestayownerHomestayRequest);

}
