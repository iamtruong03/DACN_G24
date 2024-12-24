package com.group24.cors.customer.services.impl;

import com.group24.cors.common.base.PageableObject;
import com.group24.cors.customer.model.request.CustomerImgCommentRequest;
import com.group24.cors.customer.repository.CustomerImgCommentRepository;
import com.group24.cors.customer.services.CustomerImgCommentService;
import com.group24.entities.ImgComment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CustomerImgCommentServiceImpl implements CustomerImgCommentService {

    @Autowired
    private CustomerImgCommentRepository customerImgCommentRepository;

    @Override
    public PageableObject<ImgComment> getImgCommentByCommentId(CustomerImgCommentRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<ImgComment> res = customerImgCommentRepository.findByCommentId(pageable, request.getCommentId());
        return new PageableObject<>(res);
    }

}
