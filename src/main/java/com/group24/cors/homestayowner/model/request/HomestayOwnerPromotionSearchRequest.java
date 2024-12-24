package com.group24.cors.homestayowner.model.request;

import com.group24.cors.common.base.PageableRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HomestayOwnerPromotionSearchRequest extends PageableRequest {

    private String idOwner;

    private String name;

    private Integer status;

}
