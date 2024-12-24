package com.group24.cors.homestayowner.model.request.loginrequest;

import com.group24.infrastructure.contant.Status;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HomestayOwnerOwnerHomestayRequest {

    private String name;

    private Long birthday;

    private Boolean gender;

    private String address;

    private String phoneNumber;

    private String email;

    private String username;

    private String password;

    private String nameBack;

    private String nameAccount;

    private String numberAccount;

    private MultipartFile avataUrl;

    private Status status;

}
