package com.group24.cors.homestayowner.service;

public interface HomestayOwnerForgetPassService {
    void sendResetPasswordEmail(String username);

    void resetPasswordWithToken(String resetPasswordToken, String newPassword);

}
