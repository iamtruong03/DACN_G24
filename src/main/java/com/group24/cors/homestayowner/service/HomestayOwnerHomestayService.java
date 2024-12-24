package com.group24.cors.homestayowner.service;

import com.group24.cors.common.base.PageableObject;
import com.group24.cors.homestayowner.model.request.HomestayOwnerHomestayGetRequest;
import com.group24.cors.homestayowner.model.request.HomestayownerHomestayRequest;
import com.group24.entities.Homestay;
import com.group24.entities.OwnerHomestay;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface HomestayOwnerHomestayService {

    PageableObject<Homestay> getPageHomestay(HomestayOwnerHomestayGetRequest request);

    Homestay updateHomestays(String id, HomestayownerHomestayRequest request, List<String> idConvenientHomestay) throws IOException;

    Homestay deleteHomestays(String id);

    Homestay addHomestay(HomestayownerHomestayRequest request, List<MultipartFile> multipartFiles, List<String> idConvenientHomestay) throws IOException;

    Homestay updateStatusHomestay(String id);

    Homestay updateHomestayPromition(String id, HomestayownerHomestayRequest request);

    OwnerHomestay getOwnerHomestayByToken(String token);
}
