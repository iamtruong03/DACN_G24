package com.group24.cors.homestayowner.service.impl;

import com.cloudinary.Cloudinary;
import com.group24.cors.homestayowner.model.reponse.loginreponse.HomestayOwnerAuthenticationReponse;
import com.group24.cors.homestayowner.model.request.loginrequest.HomestayOwnerOwnerHomestayRequest;
import com.group24.cors.homestayowner.model.request.loginrequest.HomestayOwnerPasswordRequest;
import com.group24.cors.homestayowner.model.request.loginrequest.HomestayOwnerUsenamePasswordRequest;
import com.group24.cors.homestayowner.repository.HomestayOwnerAdminRepository;
import com.group24.cors.homestayowner.repository.HomestayOwnerOwnerHomestayRepository;
import com.group24.cors.homestayowner.repository.HomestayOwnerTokenRepository;
import com.group24.cors.homestayowner.repository.HomestayOwnerUserRepository;
import com.group24.cors.homestayowner.service.HomestayOwnerLoginService;
import com.group24.entities.OwnerHomestay;
import com.group24.entities.Token;
import com.group24.infrastructure.configemail.Email;
import com.group24.infrastructure.configemail.EmailSender;
import com.group24.infrastructure.contant.Status;
import com.group24.infrastructure.contant.TypeToken;
import com.group24.infrastructure.contant.role.RoleOwner;
import com.group24.infrastructure.exception.rest.RestApiException;
import com.group24.infrastructure.security.token.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.Principal;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

@Async
@Service
@RequiredArgsConstructor
public class HomestayOwnerLoginServiceImpl implements HomestayOwnerLoginService {

    @Autowired
    private HomestayOwnerOwnerHomestayRepository homestayownerOwnerHomestayRepository;

    @Autowired
    private HomestayOwnerAdminRepository homestayOwnerAdminRepository;

    @Autowired
    private HomestayOwnerUserRepository homestayOwnerUserRepository;

    @Autowired
    private HomestayOwnerTokenRepository tokenRepository;

    @Autowired
    private EmailSender emailSender;

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public void confirmEmail(String id) {
        OwnerHomestay ownerHomestay = homestayownerOwnerHomestayRepository.findById(id).orElseThrow(() -> new RestApiException("Mã xác nhận không hợp lệ"));
        ownerHomestay.setStatus(Status.HOAT_DONG);
        homestayownerOwnerHomestayRepository.save(ownerHomestay);
    }

    private boolean usernameExistsInAdmin(String username) {
        return homestayOwnerAdminRepository.existsByUsername(username);
    }

    private boolean usernameExistsInOwnerHomestay(String username) {
        return homestayownerOwnerHomestayRepository.existsByUsername(username);
    }

    private boolean usernameExistsInUser(String username) {
        return homestayOwnerUserRepository.existsByUsername(username);
    }

    @Override
    public HomestayOwnerAuthenticationReponse register(HomestayOwnerOwnerHomestayRequest request) {

        if (usernameExistsInAdmin(request.getUsername()) || usernameExistsInUser(request.getUsername()) || usernameExistsInOwnerHomestay(request.getUsername())){
            throw new RestApiException(" Username đã được sử dụng");
        }
        if (isNullOrEmpty(request.getUsername())) {
            throw new RestApiException("Username không được để trống");
        }
        if (isNullOrEmpty(request.getPhoneNumber())) {
            throw new RestApiException("số điện thoại không được để trống");
        }
        if (isNullOrEmpty(request.getEmail())) {
            throw new RestApiException("Email không được để trống");
        }
        if (isNullOrEmpty(request.getPassword())) {
            throw new RestApiException("Password không được để trống");
        }
        if (isNullOrEmpty(request.getName())) {
            throw new RestApiException("Tên không được để trống");
        }

        OwnerHomestay ownerHomestay = new OwnerHomestay();
        Random random = new Random();
        int number = random.nextInt(1000);
        String code = String.format("G%04d", number);
        ownerHomestay.setCode(code);

        if (homestayownerOwnerHomestayRepository.existsByEmail(request.getEmail())) {
            throw new RestApiException("Email đã được sử dụng");
        }
        if (homestayownerOwnerHomestayRepository.existsByPhoneNumber(request.getPhoneNumber())) {
            throw new RestApiException("PhoneNumber đã được sử dụng");
        }
        String phoneNumber = request.getPhoneNumber();
        if (!isValidVietnamesePhoneNumber(phoneNumber)) {
            throw new RestApiException("Đúng định dạng số điện thoại việt nam");
        }
        String emails=request.getEmail();
        if (!isValidEmail(emails)){
            throw new RestApiException("Đúng định dạng email");
        }

        ownerHomestay.setName(request.getName());
        ownerHomestay.setPhoneNumber(request.getPhoneNumber());
        ownerHomestay.setEmail(request.getEmail());
        ownerHomestay.setUsername(request.getUsername());
        ownerHomestay.setBirthday(request.getBirthday());
        ownerHomestay.setGender(request.getGender());
        ownerHomestay.setNameBank(request.getNameBack());
        ownerHomestay.setNameAccount(request.getNameAccount());
        ownerHomestay.setNumberAccount(request.getNumberAccount());
        ownerHomestay.setAddress(request.getAddress());
        ownerHomestay.setPassword(passwordEncoder.encode(request.getPassword()));
        ownerHomestay.setStatus(Status.CHO_DUYET);
        ownerHomestay.setRole(RoleOwner.OWNER);
        OwnerHomestay owner = homestayownerOwnerHomestayRepository.save(ownerHomestay);
        var jwtToken = jwtService.generateToken(ownerHomestay);
        saveUserToken(ownerHomestay, jwtToken);

        Email email = new Email();
        email.setToEmail(new String[]{ownerHomestay.getEmail()});
        email.setSubject("Chào mừng đến với trang Web TravelViVu");
        email.setTitleEmail("Chúc mừng " + ownerHomestay.getUsername());
        String confirmationLink = "http://localhost:3000/owner/comfirmmail?id=" + ownerHomestay.getId();
        String emailBody = "Bạn đã đăng ký thành công. Vui lòng xác nhận email bằng cách nhấp vào liên kết sau: " + confirmationLink;
        email.setBody(emailBody);
        emailSender.sendEmail(email.getToEmail(), email.getSubject(), email.getTitleEmail(), emailBody);

        return HomestayOwnerAuthenticationReponse.builder()
                .code(ownerHomestay.getCode())
                .id(ownerHomestay.getId())
                .name(ownerHomestay.getName())
                .phoneNumber(ownerHomestay.getPhoneNumber())
                .email(ownerHomestay.getEmail())
                .username(ownerHomestay.getUsername())
                .nameBack(ownerHomestay.getNameBank())
                .nameAccount(ownerHomestay.getNameAccount())
                .numberAccount(ownerHomestay.getNumberAccount())
                .status(ownerHomestay.getStatus())
                .roleOwner(ownerHomestay.getRole())
                .avataUrl(ownerHomestay.getAvatarUrl())
                .build();
    }

    @Override
    public HomestayOwnerAuthenticationReponse authenticate(HomestayOwnerUsenamePasswordRequest request) {
        if (isNullOrEmpty(request.getUsername())) {
            throw new RestApiException("Username cannot be empty");
        }
        if (isNullOrEmpty(request.getPassword())) {
            throw new RestApiException("Password number cannot be empty");
        }
        if (homestayownerOwnerHomestayRepository.existsByUsername(request.getUsername())==false) {
            throw new RestApiException("Username isn't exist");
        }
        var ownerHomestay = homestayownerOwnerHomestayRepository.findByUsername(request.getUsername()).orElseThrow();
        if (!passwordEncoder.matches(request.getPassword(), ownerHomestay.getPassword())) {
            throw new RestApiException("password isn't true");
        }
        if(ownerHomestay.getStatus().equals(Status.KHONG_HOAT_DONG) || ownerHomestay.getStatus().equals(Status.CHO_DUYET)){
            throw new RestApiException("user isn't work");
        }
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        var jwtToken = jwtService.generateToken(ownerHomestay);
        var refreshToken = jwtService.generateRefreshToken(ownerHomestay);
        revokeAllUserTokens(ownerHomestay);
        saveUserToken(ownerHomestay, jwtToken);

        return HomestayOwnerAuthenticationReponse.builder().
                token(jwtToken)
                .id(ownerHomestay.getId())
                .code(ownerHomestay.getCode())
                .name(ownerHomestay.getName())
                .birthday(ownerHomestay.getBirthday())
                .gender(ownerHomestay.getGender())
                .address(ownerHomestay.getAddress())
                .phoneNumber(ownerHomestay.getPhoneNumber())
                .nameBack(ownerHomestay.getNameBank())
                .nameAccount(ownerHomestay.getNameAccount())
                .numberAccount(ownerHomestay.getNumberAccount())
                .email(ownerHomestay.getEmail())
                .username(ownerHomestay.getUsername())
                .status(ownerHomestay.getStatus())
                .roleOwner(ownerHomestay.getRole())
                .refreshToken(refreshToken)
                .avataUrl(ownerHomestay.getAvatarUrl())
                .build();
    }

    @Override
    public HomestayOwnerAuthenticationReponse changePassword(HomestayOwnerPasswordRequest request, Principal connecteUser) {
        var ownerHomestay = (OwnerHomestay) ((UsernamePasswordAuthenticationToken) connecteUser).getPrincipal();
        if (!passwordEncoder.matches(request.getCurrentPassword(), ownerHomestay.getPassword())) {
            throw new IllegalStateException("Sai mật khẩu");
        }
        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new IllegalStateException("Mật khẩu không giống nhau");
        }

        ownerHomestay.setPassword(passwordEncoder.encode(request.getNewPassword()));
        homestayownerOwnerHomestayRepository.save(ownerHomestay);

        return HomestayOwnerAuthenticationReponse.builder()
                .id(ownerHomestay.getId())
                .code(ownerHomestay.getCode())
                .name(ownerHomestay.getName())
                .birthday(ownerHomestay.getBirthday())
                .gender(ownerHomestay.getGender())
                .address(ownerHomestay.getAddress())
                .phoneNumber(ownerHomestay.getPhoneNumber())
                .nameBack(ownerHomestay.getNameBank())
                .nameAccount(ownerHomestay.getNameAccount())
                .numberAccount(ownerHomestay.getNumberAccount())
                .email(ownerHomestay.getEmail())
                .username(ownerHomestay.getUsername())
                .status(ownerHomestay.getStatus())
                .roleOwner(ownerHomestay.getRole())
                .avataUrl(ownerHomestay.getAvatarUrl())
                .build();
    }

    @Override
    public HomestayOwnerAuthenticationReponse updateInformationOwner(String idOwner, HomestayOwnerOwnerHomestayRequest request) throws IOException{

        checkNull(isNullOrEmpty(request.getUsername()), isNullOrEmpty(request.getName()), request.getBirthday(), isNullOrEmpty(request.getAddress()), isNullOrEmpty(request.getPhoneNumber()), isNullOrEmpty(request.getEmail()), request);
        OwnerHomestay ownerHomestay = homestayownerOwnerHomestayRepository.findById(idOwner).orElse(null);
        String phoneNumber = request.getPhoneNumber();

        if (!isValidVietnamesePhoneNumber(phoneNumber)) {
            throw new RestApiException("Đúng định dạng số điện thoại Việt Nam");
        }
        String emails=request.getEmail();
        if (!isValidEmail(emails)){
            throw new RestApiException("Đúng định dạng Email");
        }
        if ((usernameExistsInAdmin(request.getUsername()) || usernameExistsInUser(request.getUsername()) || usernameExistsInOwnerHomestay(request.getUsername())) && !ownerHomestay.getUsername().equals(request.getUsername())) {
            throw new RestApiException("Username đã được sử dụng");
        }
        if (homestayownerOwnerHomestayRepository.existsByEmail(request.getEmail()) && !ownerHomestay.getEmail().equals(request.getEmail())) {
            throw new RestApiException("Email đã được sử dụng");
        }
        if (homestayownerOwnerHomestayRepository.existsByPhoneNumber(request.getPhoneNumber()) && !ownerHomestay.getPhoneNumber().equals(request.getPhoneNumber())) {
            throw new RestApiException("PhoneNumber đã được sử dụng");
        }

        ownerHomestay.setName(request.getName());
        ownerHomestay.setBirthday(request.getBirthday());
        ownerHomestay.setGender(request.getGender());
        ownerHomestay.setAddress(request.getAddress());
        if(request.getNameBack() != null || request.getNameAccount() != null || request.getNumberAccount() != null) {
            if(isNullOrEmpty(request.getNameBack())) {
                throw new RestApiException("tên ngân hành không được để trống");
            }
            if(isNullOrEmpty(request.getNameAccount())) {
                throw new RestApiException("tên tài khoản ngân hàng không được để trống");
            }
            if(isNullOrEmpty(request.getNumberAccount())) {
                throw new RestApiException("Số tài khoản ngân hàng không được để trống");
            }
                ownerHomestay.setNameBank(request.getNameBack());
                ownerHomestay.setNameAccount(request.getNameAccount());
                ownerHomestay.setNumberAccount(request.getNumberAccount());
        }
        ownerHomestay.setPhoneNumber(request.getPhoneNumber());
        ownerHomestay.setEmail(request.getEmail());
        ownerHomestay.setUsername(request.getUsername());
        if(request.getAvataUrl()!=null && request.getAvataUrl().getBytes().length > 0) {
            ownerHomestay.setAvatarUrl(cloudinary.uploader()
                    .upload(request.getAvataUrl().getBytes(),
                            Map.of("id", UUID.randomUUID().toString()))
                    .get("url")
                    .toString());
            homestayownerOwnerHomestayRepository.save(ownerHomestay);
        }else if(request.getAvataUrl()==null && ownerHomestay.getAvatarUrl()!=null){
            homestayownerOwnerHomestayRepository.save(ownerHomestay);
        }else{
            homestayownerOwnerHomestayRepository.save(ownerHomestay);
        }
        var jwtToken = jwtService.generateToken(ownerHomestay);
        var refreshToken = jwtService.generateRefreshToken(ownerHomestay);
        revokeAllUserTokens(ownerHomestay);
        saveUserToken(ownerHomestay, jwtToken);

        return HomestayOwnerAuthenticationReponse.builder()
                .token(jwtToken)
                .code(ownerHomestay.getCode())
                .id(ownerHomestay.getId())
                .name(ownerHomestay.getName())
                .birthday(ownerHomestay.getBirthday())
                .gender(ownerHomestay.getGender())
                .address(ownerHomestay.getAddress())
                .phoneNumber(ownerHomestay.getPhoneNumber())
                .nameBack(ownerHomestay.getNameBank())
                .nameAccount(ownerHomestay.getNameAccount())
                .numberAccount(ownerHomestay.getNumberAccount())
                .avataUrl(ownerHomestay.getAvatarUrl())
                .email(ownerHomestay.getEmail())
                .username(ownerHomestay.getUsername())
                .status(ownerHomestay.getStatus())
                .roleOwner(ownerHomestay.getRole())
                .build();
    }

    public void checkNull(boolean nullOrEmpty, boolean nullOrEmpty2, Long birthday, boolean nullOrEmpty3, boolean nullOrEmpty4, boolean nullOrEmpty5, HomestayOwnerOwnerHomestayRequest request) {
        if (nullOrEmpty) {
            throw new RestApiException("Username không được để trống");
        }
        if (nullOrEmpty2) {
            throw new RestApiException("tên không được để trống");
        }
        if (nullOrEmpty4) {
            throw new RestApiException("Số điện thoại không được để trống");
        }
        if (nullOrEmpty5) {
            throw new RestApiException("Email không được để trống");
        }
    }

    private Boolean isValidEmail(String email){
        String regex="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$";
        return email.matches(regex);
    }

    private boolean isValidVietnamesePhoneNumber(String phoneNumber) {
        String regex = "^(03|05|07|08|09)\\d{8}$";
        return phoneNumber.matches(regex);
    }

    public static boolean isNullOrEmpty(String str) {
        return str == null || str.trim().isEmpty();
    }

    private void saveUserToken(OwnerHomestay ownerHomestay, String jwtToken) {
        var token = Token.builder()
                .ownerHomestay(ownerHomestay)
                .token(jwtToken)
                .tokenType(TypeToken.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(OwnerHomestay ownerHomestay) {
        var validUserTokens = tokenRepository.findAllValidTokenByOwnerHomestay(ownerHomestay.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

}
