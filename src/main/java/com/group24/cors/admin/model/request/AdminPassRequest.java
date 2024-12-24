package com.group24.cors.admin.model.request;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminPassRequest {

    private String currentPassword;

    private String newPassword;

    private String confirmationPassword;

}
