package com.group24.cors.admin.model.request;

import com.group24.cors.common.base.PageableRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminCommentRequest extends PageableRequest {
    String homestayId;

    String userName;

    String homestayName;

    String commentId;

    String userId;
}
