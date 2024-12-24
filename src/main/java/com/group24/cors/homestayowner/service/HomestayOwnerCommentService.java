package com.group24.cors.homestayowner.service;

import com.group24.cors.common.base.PageableObject;
import com.group24.cors.homestayowner.model.request.HomestayOwnerCommentRequest;
import com.group24.cors.homestayowner.model.request.HomestayOwnerDeleteCommentRequest;
import com.group24.entities.Comment;

import java.io.IOException;

public interface HomestayOwnerCommentService {

    PageableObject<Comment> getComment(String idHomestay, HomestayOwnerCommentRequest homestayOwnerCommentRequest);

    Comment addComment(HomestayOwnerCommentRequest request) throws IOException;

    Comment delete(HomestayOwnerDeleteCommentRequest request);
}
