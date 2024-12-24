package com.group24.cors.homestayowner.service.impl;

import com.group24.cors.common.base.PageableObject;
import com.group24.cors.homestayowner.model.reponse.HomestayOwnerConvenientReponse;
import com.group24.cors.homestayowner.model.reponse.HomestayOwnerHomestayReponse;
import com.group24.cors.homestayowner.model.request.HomestayownerHomestayRequest;
import com.group24.cors.homestayowner.repository.HomestayOwnerConvenientHRepo;
import com.group24.cors.homestayowner.repository.HomestayOwnerHomestayRepository;
import com.group24.cors.homestayowner.service.HomestayOwnerConvenientSerivce;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HomestayOwnerConvenientServiceImpl implements HomestayOwnerConvenientSerivce {

    @Autowired
    private HomestayOwnerConvenientHRepo ownerConvenientHRepo;

    @Autowired
    private HomestayOwnerHomestayRepository homestayOwnerHomestayRepository;

    @Override
    public List<HomestayOwnerConvenientReponse> getHomestayOwnerConvenientHomestay() {
        return ownerConvenientHRepo.getConvenientHomestay();
    }

    @Override
    public PageableObject<HomestayOwnerHomestayReponse> getPageablebyConvenient(String id, HomestayownerHomestayRequest homestayownerHomestayRequest) {
        Pageable pageable = PageRequest.of(homestayownerHomestayRequest.getPage(),homestayownerHomestayRequest.getSize());
        Page<HomestayOwnerHomestayReponse> res=homestayOwnerHomestayRepository.getHomestayByConvient(id,pageable);
        return new PageableObject<>(res);
    }

}
