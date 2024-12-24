package com.group24.cors.homestayowner.controller;

import com.group24.cors.common.base.ResponseObject;
import com.group24.cors.homestayowner.model.reponse.loginreponse.HomestayOwnerAuthenticationReponse;
import com.group24.cors.homestayowner.model.request.loginrequest.HomestayOwnerOwnerHomestayRequest;
import com.group24.cors.homestayowner.model.request.loginrequest.HomestayOwnerUsenamePasswordRequest;
import com.group24.cors.homestayowner.model.request.loginrequest.HomestayownerLoginRequest;
import com.group24.cors.homestayowner.service.HomestayOwnerForgetPassService;
import com.group24.cors.homestayowner.service.HomestayOwnerLoginService;
import com.group24.entities.Homestay;
import com.group24.infrastructure.exception.rest.RestApiException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3002")
@RestController
@RequestMapping("/api/v2/login")
public class HomestayOwnerLoginController {

    @Autowired
    private HomestayOwnerLoginService homestayownerLoginService;

    @Autowired
    private HomestayOwnerForgetPassService createResetPasswordToken;


    @PostMapping("/authenticate")
    public ResponseObject authenticate(@RequestBody HomestayOwnerUsenamePasswordRequest request) {
        try {
            HomestayOwnerAuthenticationReponse authenticationResponse = homestayownerLoginService.authenticate(request);
            ResponseObject responseObject = new ResponseObject(authenticationResponse);
            responseObject.setMessage("Thành công");
            return responseObject;
        } catch (RestApiException ex) {
            ResponseObject responseObject = new ResponseObject(null);
            responseObject.setMessage("Không thành công: " + ex.getMessage());
            return responseObject;
        }
    }

    @PostMapping("/registers")
    public ResponseObject registers(@RequestBody HomestayOwnerOwnerHomestayRequest request) {
        return new ResponseObject(homestayownerLoginService.register(request));
    }

    @PostMapping("/reset-password")
    public ResponseObject resetPassword(@RequestParam("username") String username) {
        if (username != null) {
            createResetPasswordToken.sendResetPasswordEmail(username);
            return new ResponseObject("Yêu cầu đặt lại mật khẩu đã được gửi đến địa chỉ email của bạn.");
        } else {
            return new ResponseObject("Không tìm thấy tài khoản với tên đăng nhập này.");
        }
    }

    @PostMapping("/reset-passwords")
    public ResponseObject resetPasswordWithToken(@RequestParam("id") String id, @RequestParam("newPass") String newPassword) {
        if (id != null) {
            createResetPasswordToken.resetPasswordWithToken(id, newPassword);
            return new ResponseObject("Mật khẩu đã được đặt lại thành công.");
        } else {
            return new ResponseObject("Id không hợp lệ hoặc không có");
        }
    }

    @PostMapping("/confirm-email")
    public ResponseObject confirmEmail(@RequestParam("id") String id) {
        homestayownerLoginService.confirmEmail(id);
        return new ResponseObject("Email xác nhận thành công");
    }

}
