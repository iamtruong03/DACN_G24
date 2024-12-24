package com.group24.cors.admin.model.request;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdminUserPasswordRequest {

    private String username;

    private String password;

}
