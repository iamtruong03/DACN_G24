package com.group24.cors.customer.services.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.group24.cors.common.base.PageableObject;
import com.group24.cors.customer.model.request.CustomerCommentAddRequest;
import com.group24.cors.customer.model.request.CustomerCommentByUserRequest;
import com.group24.cors.customer.model.request.CustomerCommentRequest;
import com.group24.cors.customer.repository.*;
import com.group24.cors.customer.services.CustomerCommentService;
import com.group24.entities.Comment;
import com.group24.entities.ImgComment;
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
public class CustomerCommentServiceImpl implements CustomerCommentService {

    @Autowired
    private CustomerCommentRepository customerCommentRepository;

    @Autowired
    private CustomerHomestayRepository customerHomestayRepository;

    @Autowired
    private CustomerLoginRepository customerLoginRepository;

    @Autowired
    private CustomerImgCommentRepository customerImgCommentRepository;

    @Autowired
    private CustomerBookingRepository customerBookingRepository;

    @Autowired
    private Cloudinary cloudinary;

    @Override
    public PageableObject<Comment> getCommentByHomestayId(CustomerCommentRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<Comment> res = customerCommentRepository.findByHomestayId(pageable, request.getHomestayId());
        return new PageableObject<>(res);
    }

    @Override
    public Integer getNumberOfReviewers(CustomerCommentRequest request) {
        return customerCommentRepository.getNumberOfReviewers(request);
    }

    @Override
    public Double getAvgPoint(CustomerCommentRequest request) {
        return customerCommentRepository.getAvgPoint(request);
    }

    @Override
    public Comment addComment(CustomerCommentAddRequest request) throws IOException {
        Comment comment = new Comment();
        comment.setHomestay(customerHomestayRepository.findById(request.getHomestay()).get());
        comment.setComment(request.getComment());
        comment.setPoint(request.getPoint());
        comment.setUser(customerLoginRepository.findById(request.getUser()).get());
        Comment savedComment = customerCommentRepository.save(comment);

        if(request.getMultipartFiles()!=null){
            List<ImgComment> newImages = new ArrayList<>();
            for (MultipartFile image : request.getMultipartFiles()) {
                ImgComment imgComment = new ImgComment();
                imgComment.setComment(savedComment);
                Map uploadResult = cloudinary.uploader().upload(image.getBytes(), ObjectUtils.asMap("folder", "comments_images"));
                imgComment.setImgUrl(uploadResult.get("url").toString());
                customerImgCommentRepository.save(imgComment);
                newImages.add(imgComment);
                savedComment.setImages(newImages);
            }}else{
            comment.setImages(null);
        }
        Comment add = customerCommentRepository.save(savedComment);
        return add;
    }

    @Override
    public PageableObject<Comment> getCommentByUserId(CustomerCommentByUserRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<Comment> res = customerCommentRepository.commentByUserId(pageable,request.getIdUser());
        return new PageableObject<>(res);
    }


}
