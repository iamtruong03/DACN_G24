package com.group24.cors.customer.model.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
public class CustomerCommentAddRequest {

    private String homestay;

    private String comment;

    private Double point;

    private String user;

    private List<MultipartFile> multipartFiles;

}
