package com.group24.cors.admin.services;


import com.group24.cors.admin.model.request.AdminOwnerHomestayAppRequest;
import com.group24.cors.admin.model.request.AdminOwnerHomestayRequest;
import com.group24.cors.common.base.PageableObject;
import com.group24.entities.Homestay;
import com.group24.entities.OwnerHomestay;

public interface AdminOwnerHomestayService {

    PageableObject<OwnerHomestay> getAllOwner(AdminOwnerHomestayRequest request);

    OwnerHomestay adminApprovalOwnerHomestay(AdminOwnerHomestayAppRequest request);

    OwnerHomestay adminRefuseOwnerHomestay(AdminOwnerHomestayAppRequest request);
}
