package com.group24.cors.homestayowner.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HomestayOwnerStatisticalRequest {

    private String idOwnerHomestay;

    private Integer month ;

    private Integer year;

    private Integer date;

}
