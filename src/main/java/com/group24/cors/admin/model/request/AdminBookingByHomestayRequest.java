package com.group24.cors.admin.model.request;

import com.group24.cors.common.base.PageableRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminBookingByHomestayRequest extends PageableRequest {

    private String homestayId;

}
