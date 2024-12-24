package com.group24.cors.admin.model.request;

import com.group24.cors.common.base.PageableRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminHomestayRequest extends PageableRequest {

    String nameHomestay;

    String nameOwner;

    Integer statusHomestay;

}

