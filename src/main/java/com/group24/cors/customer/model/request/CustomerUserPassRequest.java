package com.group24.cors.customer.model.request;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CustomerUserPassRequest {
    private String username;
    private String password;
}
