package com.group24.cors.customer.services;

import com.group24.cors.common.base.PageableObject;
import com.group24.cors.customer.model.request.CustomerCommentAddRequest;
import com.group24.cors.customer.model.request.CustomerCommentByUserRequest;
import com.group24.cors.customer.model.request.CustomerCommentRequest;
import com.group24.entities.Comment;

import java.io.IOException;

public interface CustomerCommentService {

    PageableObject<Comment> getCommentByHomestayId(CustomerCommentRequest request);

    Integer getNumberOfReviewers(CustomerCommentRequest request);

    Double getAvgPoint(CustomerCommentRequest request);

    Comment addComment(CustomerCommentAddRequest request) throws IOException;

    PageableObject<Comment> getCommentByUserId(CustomerCommentByUserRequest request);

}
