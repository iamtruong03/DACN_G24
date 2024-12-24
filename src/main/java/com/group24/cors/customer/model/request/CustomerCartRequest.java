package com.group24.cors.customer.model.request;

import com.group24.cors.common.base.PageableRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomerCartRequest extends PageableRequest {

    private String userId;

    private Long startDate;

    private Long endDate;

    private String homestayId;

}
