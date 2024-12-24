package com.group24.cors.customer.services;

import com.group24.cors.common.base.PageableObject;
import com.group24.cors.customer.model.request.CustomerImgCommentRequest;
import com.group24.entities.ImgComment;

public interface CustomerImgCommentService {

    PageableObject<ImgComment> getImgCommentByCommentId(CustomerImgCommentRequest request);

}
