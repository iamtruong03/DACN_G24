package com.group24.cors.customer.model.request;

import com.group24.infrastructure.contant.Status;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CustomerRequest {

    private String name;

    private Long birthday;

    private Boolean gender;

    private String address;

    private String phoneNumber;

    private String email;

    private String username;

    private String password;

    private Status status;

    private String nameBack;

    private String nameAccount;

    private String numberAccount;

    private MultipartFile avatar;

}
