package com.group24.cors.customer.model.request;

import com.group24.cors.common.base.PageableRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomerConvenientHomestayRequest extends PageableRequest {

    private String convenientHomestayTypeId;

}
