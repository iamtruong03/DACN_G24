package com.group24.cors.homestayowner.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.group24.cors.common.base.PageableObject;
import com.group24.cors.homestayowner.model.request.HomestayOwnerCommentRequest;
import com.group24.cors.homestayowner.model.request.HomestayOwnerDeleteCommentRequest;
import com.group24.cors.homestayowner.repository.HomestayOwnerCommentRepository;
import com.group24.cors.homestayowner.repository.HomestayOwnerHomestayRepository;
import com.group24.cors.homestayowner.repository.HomestayOwnerImgCommentRepository;
import com.group24.cors.homestayowner.repository.HomestayOwnerUserRepository;
import com.group24.cors.homestayowner.service.HomestayOwnerCommentService;
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
public class HomestayOwnerCommentServiceImpl implements HomestayOwnerCommentService {

    @Autowired
    private HomestayOwnerCommentRepository homestayOwnerCommentRepository;

    @Autowired
    private HomestayOwnerHomestayRepository homestayOwnerHomestayRepository;

    @Autowired
    private HomestayOwnerUserRepository homestayOwnerUserRepository;

    @Autowired
    private HomestayOwnerImgCommentRepository homestayOwnerImgCommentRepository;

    @Autowired
    private Cloudinary cloudinary;

    @Override
    public PageableObject<Comment> getComment(String idHomestay, HomestayOwnerCommentRequest homestayOwnerCommentRequest) {
        Pageable pageable = PageRequest.of(homestayOwnerCommentRequest.getPage(), homestayOwnerCommentRequest.getSize());
        Page<Comment> res = homestayOwnerCommentRepository.getComment(idHomestay,pageable);
        return new PageableObject<>(res);
    }

    @Override
    public Comment addComment(HomestayOwnerCommentRequest request) throws IOException {
        Comment comment = new Comment();
        comment.setHomestay(homestayOwnerHomestayRepository.findById(request.getHomestay()).get());
        comment.setComment(request.getComment());
        comment.setPoint(request.getPoint());
        comment.setUser(homestayOwnerUserRepository.findById(request.getUser()).get());
        Comment savedComment = homestayOwnerCommentRepository.save(comment);

        if(request.getMultipartFiles()!=null){
        List<ImgComment> newImages = new ArrayList<>();
        for (MultipartFile image : request.getMultipartFiles()) {
            ImgComment imgComment = new ImgComment();
            imgComment.setComment(savedComment);
            Map uploadResult = cloudinary.uploader().upload(image.getBytes(), ObjectUtils.asMap("folder", "comment_images"));
            imgComment.setImgUrl(uploadResult.get("url").toString());
            homestayOwnerImgCommentRepository.save(imgComment);
            newImages.add(imgComment);
            savedComment.setImages(newImages);
        }}else{
            comment.setImages(null);
        }
        Comment add = homestayOwnerCommentRepository.save(savedComment);
        return add;

    }

    @Override
    public Comment delete(HomestayOwnerDeleteCommentRequest request) {
        Comment comment = homestayOwnerCommentRepository.deleteComment(request);
        return comment;
    }


}
