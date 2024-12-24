package com.group24.cors.homestayowner.model.request;

import com.group24.cors.common.base.PageableRequest;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class HomestayownerHomestayRequest extends PageableRequest {

    private String name;

    private Long startDate;

    private Long endDate;

    private String desc;

    private Double acreage;

    private String timeCheckIn;

    private String timeCheckOut;

    private Integer roomNumber;

    private BigDecimal price;

    private Integer numberPerson;

    private String address;

    private Double CancellationPolicy;

    private String ownerHomestay;

    private String promotion;

    private String email;

    private String phonenumber;

    private String status;

    private List<MultipartFile> image;

    private List<String> idConvenientHomestay;
}
