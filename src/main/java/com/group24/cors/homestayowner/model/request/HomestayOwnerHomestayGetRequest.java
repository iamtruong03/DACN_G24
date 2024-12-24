package com.group24.cors.homestayowner.model.request;

import com.group24.cors.common.base.PageableRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HomestayOwnerHomestayGetRequest extends PageableRequest {

    private String id;

    private String status;

}
