package com.group24.cors.homestayowner.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.group24.cors.common.base.PageableObject;
import com.group24.cors.homestayowner.model.request.HomestayOwnerHomestayGetRequest;
import com.group24.cors.homestayowner.model.request.HomestayownerHomestayRequest;
import com.group24.cors.homestayowner.repository.HomestayOwnerBookingRepository;
import com.group24.cors.homestayowner.repository.HomestayOwnerConvenientHomestayRepository;
import com.group24.cors.homestayowner.repository.HomestayOwnerDetailHomestayReposritory;
import com.group24.cors.homestayowner.repository.HomestayOwnerHomestayRepository;
import com.group24.cors.homestayowner.repository.HomestayOwnerImgHomestayRepo;
import com.group24.cors.homestayowner.repository.HomestayOwnerOwnerHomestayRepository;
import com.group24.cors.homestayowner.repository.HomestayOwnerPromotionRepository;
import com.group24.cors.homestayowner.service.HomestayOwnerHomestayService;
import com.group24.entities.ConvenientHomestay;
import com.group24.entities.DetailHomestay;
import com.group24.entities.Homestay;
import com.group24.entities.ImgHomestay;
import com.group24.entities.OwnerHomestay;
import com.group24.entities.Promotion;
import com.group24.infrastructure.contant.Status;
import com.group24.infrastructure.exception.rest.RestApiException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class HomestayOwnerHomestayServiceImpl implements HomestayOwnerHomestayService {

    @Autowired
    private HomestayOwnerHomestayRepository homestayownerHomestayRepository;

    @Autowired
    private HomestayOwnerImgHomestayRepo homestayOwnerImgHomestayRepo;

    @Autowired
    private HomestayOwnerOwnerHomestayRepository homestayOwnerOwnerHomestayRepository;

    @Autowired
    private HomestayOwnerDetailHomestayReposritory homestayOwnerDetailHomestayReposritory;

    @Autowired
    private HomestayOwnerConvenientHomestayRepository homestayOwnerConvenientHomestayRepository;

    @Autowired
    private HomestayOwnerPromotionRepository homestayOwnerPromotionRepository;

    @Autowired
    private HomestayOwnerBookingRepository homestayOwnerBookingRepository;

    @Autowired
    private Cloudinary cloudinary;

    @Override
    public PageableObject<Homestay> getPageHomestay(HomestayOwnerHomestayGetRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<Homestay> res = homestayownerHomestayRepository.getHomestayByOwnerH(request, pageable);
        return new PageableObject<>(res);
    }

    @Override
    @Transactional
    public Homestay updateHomestays(String id, HomestayownerHomestayRequest request, List<String> idConvenientHomestay) throws IOException {
        Homestay homestay = homestayownerHomestayRepository.findById(id).orElse(null);
        getHomestay(request, homestay);
        Homestay homestay1 = homestayownerHomestayRepository.save(homestay);
        homestayOwnerDetailHomestayReposritory.deleteByHomestay(id);
        return getImgHomestayAndConvenientHomestay(id, idConvenientHomestay, homestay1);
    }

    @Override
    public Homestay deleteHomestays(String id) {
        Homestay homestay = homestayownerHomestayRepository.findById(id).orElse(null);
        homestay.setStatus(Status.KHONG_HOAT_DONG);
        if (homestayOwnerBookingRepository.getBookingActive(id).size() == 0) {
            Homestay homestay1 = homestayownerHomestayRepository.save(homestay);
            return homestay1;
        } else {
            throw new RestApiException("Homestay đang được book!");
        }
    }

    @Override
    public Homestay addHomestay(HomestayownerHomestayRequest request, List<MultipartFile> multipartFiles, List<String> idConvenientHomestay) throws IOException {
        Homestay homestay = new Homestay();
        getHomestay(request, homestay);
        homestay.setStatus(Status.CHO_DUYET);
        Homestay homestay1 = homestayownerHomestayRepository.save(homestay);
        return getImgHomestayAndConvenientHomestay(multipartFiles, idConvenientHomestay, homestay1);
    }

    @Override
    public Homestay updateStatusHomestay(String id) {
        Homestay homestay = homestayownerHomestayRepository.findById(id).orElse(null);
        homestay.setStatus(Status.CHO_DUYET);
        if (homestayOwnerBookingRepository.getBookingActive(id).size() == 0) {
            Homestay homestay1 = homestayownerHomestayRepository.save(homestay);
            return homestay1;
        } else {
            throw new RestApiException("Homestay đang được book!");
        }
    }

    @Override
    public Homestay updateHomestayPromition(String id, HomestayownerHomestayRequest request) {
        Homestay homestay = homestayownerHomestayRepository.findById(id).get();
        Promotion newPromotion = homestayOwnerPromotionRepository.findById(request.getPromotion()).orElse(null);
        homestay.setPromotion(newPromotion);
        Homestay homestay1 = homestayownerHomestayRepository.save(homestay);
        return homestay1;
    }

    @Override
    public OwnerHomestay getOwnerHomestayByToken(String token) {
        return homestayOwnerOwnerHomestayRepository.findOwnerByToken(token);
    }

    private void getHomestay(HomestayownerHomestayRequest request, Homestay homestay) {
        homestay.setName(request.getName());
        homestay.setDesc(request.getDesc());
        homestay.setPrice(request.getPrice());
        homestay.setNumberPerson(request.getNumberPerson());
        homestay.setAddress(request.getAddress());
        homestay.setStartDate(request.getStartDate());
        homestay.setEndDate(request.getEndDate());
        homestay.setAcreage(request.getAcreage());
        homestay.setRoomNumber(request.getRoomNumber());
        homestay.setTimeCheckIn(request.getTimeCheckIn());
        homestay.setTimeCheckOut(request.getTimeCheckOut());
        homestay.setEmail(request.getEmail());
        homestay.setPhoneNumber(request.getPhonenumber());
        homestay.setOwnerHomestay(homestayOwnerOwnerHomestayRepository.findById(request.getOwnerHomestay()).orElse(null));
    }

    private Homestay getImgHomestayAndConvenientHomestay(List<MultipartFile> multipartFiles, List<String> idConvenientHomestay, Homestay homestay1) throws IOException {
        List<ImgHomestay> newImages = new ArrayList<>();
        for (MultipartFile image : multipartFiles) {
            ImgHomestay imgHomestay = new ImgHomestay();
            imgHomestay.setHomestay(homestay1);

            Map uploadResult = cloudinary.uploader().upload(image.getBytes(), ObjectUtils.asMap("folder", "homestay_images"));
            imgHomestay.setImgUrl(uploadResult.get("url").toString());
            homestayOwnerImgHomestayRepo.save(imgHomestay);
            newImages.add(imgHomestay);
        }
        homestay1.setImages(newImages);

        List<DetailHomestay> detailHomestays = new ArrayList<>();
        for (String detail : idConvenientHomestay) {
            DetailHomestay detailHomestay = new DetailHomestay();
            detailHomestay.setHomestay(homestay1);
            ConvenientHomestay convenientHomestay = homestayOwnerConvenientHomestayRepository.findById(detail).orElse(null);
            detailHomestay.setConvenientHomestay(convenientHomestay);
            homestayOwnerDetailHomestayReposritory.save(detailHomestay);
            detailHomestays.add(detailHomestay);
        }
        homestay1.setDetailHomestays(detailHomestays);
        return homestay1;
    }

    private Homestay getImgHomestayAndConvenientHomestay(String id, List<String> idConvenientHomestay, Homestay homestay1) throws IOException {
        Homestay homestay = homestayownerHomestayRepository.findById(id).orElse(null);
        List<DetailHomestay> detailHomestays = new ArrayList<>();
        for (String detail : idConvenientHomestay) {
            DetailHomestay detailHomestay = new DetailHomestay();
            detailHomestay.setHomestay(homestay1);
            ConvenientHomestay convenientHomestay = homestayOwnerConvenientHomestayRepository.findById(detail).orElse(null);
            detailHomestay.setConvenientHomestay(convenientHomestay);
            homestayOwnerDetailHomestayReposritory.save(detailHomestay);
            detailHomestays.add(detailHomestay);
        }
        homestay1.setDetailHomestays(detailHomestays);
        return homestay1;
    }

}
