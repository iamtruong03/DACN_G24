package com.group24.cors.admin.services.impl;

import com.group24.cors.admin.model.request.AdminCommentRequest;
import com.group24.cors.admin.repository.AdminCommentRepository;
import com.group24.cors.admin.repository.AdminHomestayRepository;
import com.group24.cors.admin.repository.AdminImgCommentRepository;
import com.group24.cors.admin.services.AdminCommentService;
import com.group24.cors.common.base.PageableObject;
import com.group24.entities.Comment;
import com.group24.entities.Homestay;
import com.group24.entities.ImgComment;
import com.group24.infrastructure.contant.Message;
import com.group24.infrastructure.exception.rest.RestApiException;
import com.group24.repositories.ImgCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminCommetServiceImpl implements AdminCommentService {

    @Autowired
    private AdminCommentRepository adminCommentRepository;

    @Autowired
    private AdminImgCommentRepository adminImgCommentRepository;

    @Override
    public PageableObject<Comment> getAllCommentHomestay(AdminCommentRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<Comment> comments = adminCommentRepository.getAllComment(pageable, request);
        return new PageableObject<>(comments);
    }

    @Override
    public Comment deleteComment(AdminCommentRequest request) {

        Comment comment = adminCommentRepository.findById(request.getCommentId()).orElse(null);

        if (comment != null) {
            ImgComment imgComment = adminImgCommentRepository.findById(comment.getId()).orElse(null);

            if (imgComment != null) {
                adminImgCommentRepository.delete(imgComment);
            }

            adminCommentRepository.delete(comment);
            return comment;
        } else {
            return null;
        }
    }

}
