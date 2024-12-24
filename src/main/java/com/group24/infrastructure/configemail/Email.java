package com.group24.infrastructure.configemail;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class Email {

    private String [] toEmail;

    private String subject;

    private String body;

    private String titleEmail;

}
