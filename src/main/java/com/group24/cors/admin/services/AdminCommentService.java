package com.group24.cors.admin.services;

import com.group24.cors.admin.model.request.AdminCommentRequest;
import com.group24.cors.admin.model.request.AdminHomestayRequest;
import com.group24.cors.common.base.PageableObject;
import com.group24.entities.Comment;
import com.group24.entities.Homestay;

public interface AdminCommentService {

    PageableObject<Comment> getAllCommentHomestay(AdminCommentRequest request);

    Comment deleteComment (AdminCommentRequest request);
}
