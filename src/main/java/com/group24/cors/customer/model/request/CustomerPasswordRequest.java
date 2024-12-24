package com.group24.cors.customer.model.request;

import lombok.*;

@Getter
@Setter
@Builder
public class CustomerPasswordRequest {

    private String currentPassword;

    private String newPassword;

    private String confirmationPassword;

}
