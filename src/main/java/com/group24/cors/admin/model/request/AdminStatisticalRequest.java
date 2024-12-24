package com.group24.cors.admin.model.request;

import com.group24.cors.common.base.PageableRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminStatisticalRequest {

    private Integer month ;

    private Integer year;

    private Integer date;

}
