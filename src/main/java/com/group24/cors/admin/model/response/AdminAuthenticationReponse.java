package com.group24.cors.admin.model.response;

import com.group24.infrastructure.contant.Status;
import com.group24.infrastructure.contant.role.RoleAdmin;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdminAuthenticationReponse {

    private String id;

    private String token;

    private String code;

    private String name;

    private Long birthday;

    private Boolean gender;

    private String address;

    private String phoneNumber;

    private String email;

    private String username;

    private String avataUrl;

    private Status status;

    private RoleAdmin roleAdmin;

}
