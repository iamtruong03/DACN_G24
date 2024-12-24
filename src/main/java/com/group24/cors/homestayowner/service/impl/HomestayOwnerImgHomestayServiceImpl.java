package com.group24.cors.homestayowner.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.group24.cors.homestayowner.model.reponse.HomestayOwnerImgHomestayReponse;
import com.group24.cors.homestayowner.repository.HomestayOwnerHomestayRepository;
import com.group24.cors.homestayowner.repository.HomestayOwnerImgHomestayRepo;
import com.group24.cors.homestayowner.service.HomestayOwnerImgHomestayService;
import com.group24.entities.Homestay;
import com.group24.entities.ImgHomestay;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class HomestayOwnerImgHomestayServiceImpl implements HomestayOwnerImgHomestayService {

    @Autowired
    private HomestayOwnerImgHomestayRepo homestayOwnerImgHomestayRepo;

    @Autowired
    private HomestayOwnerHomestayRepository homestayOwnerHomestayRepository;

    @Autowired
    private Cloudinary cloudinary;

    @Override
    public List<ImgHomestay> getImgHomestayByHomestayId(String id) {
        return homestayOwnerImgHomestayRepo.getImgHomestayByHomestay(id);
    }

    @Override
    public List<ImgHomestay> searchImgHomestay(String homestayId) {
        return homestayOwnerImgHomestayRepo.getImgHomestayByHomestay(homestayId);
    }

    @Override
    public List<ImgHomestay> AddImgHomestay(List<MultipartFile> multipartFiles, String idHomestay) throws IOException {
        List<ImgHomestay> newImages = new ArrayList<>();
        for (MultipartFile image : multipartFiles) {
           ImgHomestay imgHomestay=new ImgHomestay();
           Homestay homestay=homestayOwnerHomestayRepository.findById(idHomestay).get();
           imgHomestay.setHomestay(homestay);
           Map uploadResult = cloudinary.uploader().upload(image.getBytes(), ObjectUtils.asMap("folder", "homestay_images"));
           imgHomestay.setImgUrl(uploadResult.get("url").toString());
           homestayOwnerImgHomestayRepo.save(imgHomestay);
           newImages.add(imgHomestay);
        }
        return newImages;
    }

    @Override
    public ImgHomestay deleteImghomestay(String id) {
        ImgHomestay imgHomestay=homestayOwnerImgHomestayRepo.findById(id).get();
        homestayOwnerImgHomestayRepo.delete(imgHomestay);
        return imgHomestay;
    }


}
