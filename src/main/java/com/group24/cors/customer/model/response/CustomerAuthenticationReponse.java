package com.group24.cors.customer.model.response;


import com.group24.infrastructure.contant.Status;
import com.group24.infrastructure.contant.role.RoleCustomer;
import lombok.*;

@Getter
@Setter
@Builder
public class CustomerAuthenticationReponse {

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

    private String nameBack;

    private String nameAccount;

    private String numberAccount;

    private Status status;

    private RoleCustomer roleCustomer;

}
