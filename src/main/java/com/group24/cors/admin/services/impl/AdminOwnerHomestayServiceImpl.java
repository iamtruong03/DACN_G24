package com.group24.cors.admin.services.impl;


import com.group24.cors.admin.model.request.AdminOwnerHomestayAppRequest;
import com.group24.cors.admin.model.request.AdminOwnerHomestayRequest;
import com.group24.cors.admin.repository.AdminHomestayRepository;
import com.group24.cors.admin.repository.AdminOwnerHomestayRepository;
import com.group24.cors.admin.services.AdminOwnerHomestayService;
import com.group24.cors.common.base.PageableObject;
import com.group24.entities.ApprovalHistory;
import com.group24.entities.Homestay;
import com.group24.entities.OwnerHomestay;
import com.group24.infrastructure.configemail.Email;
import com.group24.infrastructure.configemail.EmailSender;
import com.group24.infrastructure.contant.Message;
import com.group24.infrastructure.contant.Status;
import com.group24.infrastructure.contant.StatusApproval;
import com.group24.infrastructure.exception.rest.RestApiException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminOwnerHomestayServiceImpl implements AdminOwnerHomestayService {
    @Autowired
    private AdminOwnerHomestayRepository adminOwnerHomestayRepository;

    @Autowired
    private AdminHomestayRepository adminHomestayRepository;

    @Autowired
    private EmailSender emailSender;

    @Override
    public PageableObject<OwnerHomestay> getAllOwner(AdminOwnerHomestayRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<OwnerHomestay> adminOwnerHomestay = adminOwnerHomestayRepository.getAllOwner(pageable, request);
        return new PageableObject<>(adminOwnerHomestay);
    }

    @Override
    public OwnerHomestay adminApprovalOwnerHomestay(AdminOwnerHomestayAppRequest request) {
        Optional<OwnerHomestay> optional = adminOwnerHomestayRepository.findById(request.getOwnerHomestayId());
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        OwnerHomestay ownerHomestay = optional.get();
        ownerHomestay.setStatus(Status.HOAT_DONG);
        adminOwnerHomestayRepository.save(ownerHomestay);

        Email email = new Email();
        email.setToEmail(new String[]{ownerHomestay.getEmail()});
        email.setSubject("Tài Khoản TravelVivu");
        email.setTitleEmail("Chúc mừng " + ownerHomestay.getName());
        email.setBody("Tài Khoản " + ownerHomestay.getName() + " của bạn đã được hoạt động trở lại");
        emailSender.sendEmail(email.getToEmail(), email.getSubject(), email.getTitleEmail(), email.getBody());
        return ownerHomestay;
    }

    @Override
    public OwnerHomestay adminRefuseOwnerHomestay(AdminOwnerHomestayAppRequest request) {
        Optional<OwnerHomestay> optional = adminOwnerHomestayRepository.findById(request.getOwnerHomestayId());
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }

        OwnerHomestay ownerHomestay = optional.get();
        List<Homestay> homestay = adminHomestayRepository.findHomestayBy(ownerHomestay.getId());
        if(!homestay.isEmpty()){
        for (Homestay x: homestay) {
            x.setStatus(Status.KHONG_HOAT_DONG);
        }}
        ownerHomestay.setStatus(Status.KHONG_HOAT_DONG);
        adminOwnerHomestayRepository.save(ownerHomestay);

        Email email = new Email();
        email.setToEmail(new String[]{ownerHomestay.getEmail()});
        email.setSubject("Tài Khoản TravelVivu");
        email.setTitleEmail("Xin Lỗi " + ownerHomestay.getName());
        email.setBody("Tài Khoản " + ownerHomestay.getName() + " của bạn đã bị khóa vui lòng liên hệ với chúng tôi để được mở khóa");
        emailSender.sendEmail(email.getToEmail(), email.getSubject(), email.getTitleEmail(), email.getBody());
        return ownerHomestay;
    }
}
