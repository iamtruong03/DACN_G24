package com.group24.cors.homestayowner.model.request;

import com.group24.cors.common.base.PageableRequest;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class HomestayOwnerCommentRequest extends PageableRequest {

    private String homestay;

    private String comment;

    private Double point;

    private String user;

    private List<MultipartFile> multipartFiles;

}
