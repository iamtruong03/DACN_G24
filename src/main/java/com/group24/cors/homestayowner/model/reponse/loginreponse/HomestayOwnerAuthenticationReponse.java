package com.group24.cors.homestayowner.model.reponse.loginreponse;

import com.group24.infrastructure.contant.Status;
import com.group24.infrastructure.contant.role.RoleOwner;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HomestayOwnerAuthenticationReponse {

    private String id;

    private String token;

    private String refreshToken;

    private String code;

    private String name;

    private Long birthday;

    private Boolean gender;

    private String address;

    private String phoneNumber;

    private String email;

    private String username;

    private String nameBack;

    private String nameAccount;

    private String numberAccount;

    private String avataUrl;

    private Status status;

    private RoleOwner roleOwner;

    private String accessToken;

}
