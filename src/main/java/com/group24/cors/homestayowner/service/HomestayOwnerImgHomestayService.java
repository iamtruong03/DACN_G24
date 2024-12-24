package com.group24.cors.homestayowner.service;

import com.group24.cors.homestayowner.model.reponse.HomestayOwnerImgHomestayReponse;
import com.group24.entities.Homestay;
import com.group24.entities.ImgHomestay;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface HomestayOwnerImgHomestayService {

    List<ImgHomestay> getImgHomestayByHomestayId(String id);

    List<ImgHomestay> searchImgHomestay(String homestayId);

    List<ImgHomestay> AddImgHomestay(List<MultipartFile> multipartFiles, String idHomestay) throws IOException;

    ImgHomestay deleteImghomestay(String id);

}