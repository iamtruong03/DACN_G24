package com.group24.cors.homestayowner.service.impl;

import com.group24.cors.homestayowner.repository.HomestayOwnerOwnerHomestayRepository;
import com.group24.cors.homestayowner.repository.HomestayOwnerTokenRepository;
import com.group24.cors.homestayowner.service.HomestayOwnerForgetPassService;
import com.group24.entities.OwnerHomestay;
import com.group24.infrastructure.configemail.Email;
import com.group24.infrastructure.configemail.EmailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class HomestayOwnerForgetPassServiceImpl implements HomestayOwnerForgetPassService {

    @Autowired
    private HomestayOwnerOwnerHomestayRepository homestayownerOwnerHomestayRepository;

    @Autowired
    private EmailSender emailSender;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void resetPasswordWithToken(String id, String newPassword) {
        OwnerHomestay ownerHomestay = homestayownerOwnerHomestayRepository.findById(id).orElse(null);
        if (ownerHomestay != null) {
            ownerHomestay.setPassword(passwordEncoder.encode(newPassword));
            homestayownerOwnerHomestayRepository.save(ownerHomestay);
        }
    }

    @Override
    public void sendResetPasswordEmail(String username) {
        OwnerHomestay owner = homestayownerOwnerHomestayRepository.findByUsername(username).orElse(null);
        if (owner != null) {
            String resetPasswordLink = "http://localhost:3000/api/v2/login/reset-password/" + owner.getId();
            String emailBody = "Bạn đã yêu cầu đặt lại mật khẩu. Vui lòng nhấp vào liên kết sau để thực hiện đặt lại mật khẩu: " + resetPasswordLink;

            Email email = new Email();
            email.setToEmail(new String[]{owner.getEmail()});
            email.setSubject("Yêu cầu đặt lại mật khẩu");
            email.setTitleEmail("Đặt lại mật khẩu");
            email.setBody(emailBody);
            emailSender.sendEmail(email.getToEmail(), email.getSubject(), email.getTitleEmail(), email.getBody());
        }
    }

}
