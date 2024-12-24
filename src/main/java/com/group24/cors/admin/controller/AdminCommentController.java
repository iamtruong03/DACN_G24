package com.group24.cors.admin.controller;

import com.group24.cors.admin.model.request.AdminCommentRequest;
import com.group24.cors.admin.model.request.AdminOwnerHomestayRequest;
import com.group24.cors.admin.services.AdminCommentService;
import com.group24.cors.common.base.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v3/comment")
public class AdminCommentController {
    @Autowired
    private AdminCommentService adminCommentService;

    @GetMapping()
    public ResponseObject getAllHomestay(final AdminCommentRequest request) {
        return new ResponseObject(adminCommentService.getAllCommentHomestay(request));
    }

    @DeleteMapping("/delete")
    public ResponseObject delete(final AdminCommentRequest request) {
        return new ResponseObject(adminCommentService.deleteComment(request));
    }
}
