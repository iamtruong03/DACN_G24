package com.group24.cors.customer.services.impl;

import com.cloudinary.Cloudinary;
import com.group24.cors.customer.model.request.CustomerForgetRequest;
import com.group24.cors.customer.model.request.CustomerPasswordRequest;
import com.group24.cors.customer.model.request.CustomerRequest;
import com.group24.cors.customer.model.request.CustomerUserPassRequest;
import com.group24.cors.customer.model.response.CustomerAuthenticationReponse;
import com.group24.cors.customer.repository.CustomerAdminRepository;
import com.group24.cors.customer.repository.CustomerHomestayOwnerRepository;
import com.group24.cors.customer.repository.CustomerLoginRepository;
import com.group24.cors.customer.repository.CustomerTokenRepository;
import com.group24.cors.customer.services.CustomerLoginService;
import com.group24.entities.OwnerHomestay;
import com.group24.entities.Token;
import com.group24.entities.User;
import com.group24.infrastructure.configemail.Email;
import com.group24.infrastructure.configemail.EmailSender;
import com.group24.infrastructure.contant.Status;
import com.group24.infrastructure.contant.TypeToken;
import com.group24.infrastructure.contant.role.RoleCustomer;
import com.group24.infrastructure.exception.rest.RestApiException;
import com.group24.infrastructure.security.token.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

@Service
public class CustomerLoginServiceImpl implements CustomerLoginService {

    @Autowired
    private CustomerLoginRepository customerLoginRepository;

    @Autowired
    private CustomerAdminRepository customerAdminRepository;

    @Autowired
    private CustomerHomestayOwnerRepository customerHomestayOwnerRepository;

    @Autowired
    private CustomerTokenRepository customerTokenRepository;

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
        User user = customerLoginRepository.findById(id).orElseThrow(() -> new RestApiException("Mã xác nhận không hợp lệ"));
        user.setStatus(Status.HOAT_DONG);
        customerLoginRepository.save(user);
    }

    private boolean usernameExistsInAdmin(String username) {
        return customerAdminRepository.existsByUsername(username);
    }

    private boolean usernameExistsInOwnerHomestay(String username) {
        return customerHomestayOwnerRepository.existsByUsername(username);
    }

    private boolean usernameExistsInUser(String username) {
        return customerLoginRepository.existsByUsername(username);
    }

    @Override
    public CustomerAuthenticationReponse CustomerRegister(CustomerRequest request) {
        if (isNullOrEmpty(request.getUsername())) {
            throw new RestApiException("tên tài khoản không được để trống");
        }
        if (isNullOrEmpty(request.getName())) {
            throw new RestApiException("Tên không được để trống");
        }
        if (isNullOrEmpty(request.getPhoneNumber())) {
            throw new RestApiException("Số điện thoại không được để trống");
        }
        if (isNullOrEmpty(request.getEmail())) {
            throw new RestApiException("Email không được để trống");
        }
        if (isNullOrEmpty(request.getPassword())) {
            throw new RestApiException("Password không được để trống");
        }
        if (usernameExistsInAdmin(request.getUsername()) || usernameExistsInUser(request.getUsername()) || usernameExistsInOwnerHomestay(request.getUsername())){
            throw new RestApiException(" Username đã được sử dụng");
        }
        if (customerLoginRepository.existsByEmail(request.getEmail())) {
            throw new RestApiException("Email đã tồn tại");
        }
        if (customerLoginRepository.existsByPhoneNumber(request.getPhoneNumber())) {
            throw new RestApiException("Số điện thoại đã tồn tại");
        }
        String phoneNumber = request.getPhoneNumber();
        if (!isValidVietnamesePhoneNumber(phoneNumber)) {
            throw new RestApiException("số điện thoại phải là số điện thoại Việt Nam");
        }
        String emails=request.getEmail();
        if (!isValidEmail(emails)){
            throw new RestApiException("Email phải đúng định dạng @gmail.com");
        }
        User user = new User();
        Random random = new Random();
        int number = random.nextInt(1000);
        String code = String.format("G%04d", number);
        user.setCode(code);
        user.setName(request.getName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setBirthday(request.getBirthday());
        user.setGender(request.getGender());
        user.setAddress(request.getAddress());
        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setStatus(Status.HOAT_DONG);
        user.setRole(RoleCustomer.CUSTOMER);
        User user1=customerLoginRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        saveUserToken(user1, jwtToken);

        Email email = new Email();
        email.setToEmail(new String[]{user.getEmail()});
        email.setSubject("Chào mừng đến với trang Web trvelViVu");
        email.setTitleEmail("Chúc mừng " + user.getUsername());
        String emailBody = "Bạn đã đăng ký thành công.";
        email.setBody(emailBody);
        emailSender.sendEmail(email.getToEmail(), email.getSubject(), email.getTitleEmail(), emailBody);

        var jwtServices = jwtService.generateToken(user);
        return CustomerAuthenticationReponse.builder()
                .token(jwtServices)
                .id(user.getId())
                .code(user.getCode())
                .name(user.getName())
                .birthday(user.getBirthday())
                .gender(user.getGender())
                .address(user.getAddress())
                .phoneNumber(user.getPhoneNumber())
                .email(user.getEmail())
                .username(user.getUsername())
                .status(user.getStatus())
                .roleCustomer(user.getRole())
                .nameAccount(user.getNameAccount())
                .nameBack(user.getNameBank())
                .numberAccount(user.getNumberAccount())
                .avataUrl(user.getAvatarUrl())
                .build();
    }

    @Override
    public CustomerAuthenticationReponse CustomerAuthenticate(CustomerUserPassRequest request) {
        if (isNullOrEmpty(request.getUsername())) {
            throw new RestApiException("Tên tài khoản không được để trống");
        }
        if (isNullOrEmpty(request.getPassword())) {
            throw new RestApiException("Mật khẩu không được để trống");
        }
        if (customerLoginRepository.existsByUsername(request.getUsername())==false) {
            throw new RestApiException("Tài khoản không tồn tại");
        }
        var user = customerLoginRepository.findByUsername(request.getUsername()).orElseThrow();
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RestApiException("Mật khẩu không đúng");
        }
        if(user.getStatus().equals(Status.KHONG_HOAT_DONG)){
            throw new RestApiException("Tài khoản đang không hoạt động");
        }
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);

        return CustomerAuthenticationReponse.builder()
                .token(jwtToken)
                .id(user.getId())
                .code(user.getCode())
                .name(user.getName())
                .birthday(user.getBirthday())
                .gender(user.getGender())
                .address(user.getAddress())
                .phoneNumber(user.getPhoneNumber())
                .email(user.getEmail())
                .username(user.getUsername())
                .nameAccount(user.getNameAccount())
                .nameBack(user.getNameBank())
                .numberAccount(user.getNumberAccount())
                .status(user.getStatus())
                .roleCustomer(user.getRole())
                .avataUrl(user.getAvatarUrl())
                .build();
    }

    @Override
    public CustomerAuthenticationReponse changePassword(CustomerPasswordRequest request, Principal connecteUser) {
        var user = (User) ((UsernamePasswordAuthenticationToken) connecteUser).getPrincipal();
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalStateException("Wrong password");
        }
        ;
        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new IllegalStateException("password aren't the same");
        }
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        customerLoginRepository.save(user);
        return CustomerAuthenticationReponse.builder()
                .id(user.getId())
                .code(user.getCode())
                .name(user.getName())
                .birthday(user.getBirthday())
                .gender(user.getGender())
                .address(user.getAddress())
                .phoneNumber(user.getPhoneNumber())
                .email(user.getEmail())
                .username(user.getUsername())
                .nameAccount(user.getNameAccount())
                .nameBack(user.getNameBank())
                .numberAccount(user.getNumberAccount())
                .status(user.getStatus())
                .roleCustomer(user.getRole())
                .avataUrl(user.getAvatarUrl())
                .build();
    }

    @Override
    public CustomerAuthenticationReponse updateInformationCusmoter(String idCustomer, CustomerRequest request) throws IOException {
        User customer = customerLoginRepository.findById(idCustomer).get();
        if (isNullOrEmpty(request.getUsername())) {
            throw new RestApiException("tên tài khoản không được để trống");
        }
        if (isNullOrEmpty(request.getName())) {
            throw new RestApiException("Tên không được để trống");
        }
        if (isNullOrEmpty(request.getPhoneNumber())) {
            throw new RestApiException("Số điện thoại không được để trống");
        }
        if (isNullOrEmpty(request.getEmail())) {
            throw new RestApiException("Email không được để trống");
        }
        if ((usernameExistsInAdmin(request.getUsername()) || usernameExistsInUser(request.getUsername()) || usernameExistsInOwnerHomestay(request.getUsername())) && ! customer.getUsername().equals(request.getUsername())) {
            throw new RestApiException("Tên tài khoản đã tồn tại");
        }
        if (customerLoginRepository.existsByEmail(request.getEmail()) && !customer.getEmail().equals(request.getEmail())) {
            throw new RestApiException("Email đã tồn tại");
        }
        if (customerLoginRepository.existsByPhoneNumber(request.getPhoneNumber()) && !customer.getPhoneNumber().equals(request.getPhoneNumber())) {
            throw new RestApiException("Số điện thoại đã tồn tại");
        }
        String phoneNumber = request.getPhoneNumber();
        if (!isValidVietnamesePhoneNumber(phoneNumber)) {
            throw new RestApiException("số điện thoại phải là số điện thoại Việt Nam");
        }
        String emails=request.getEmail();
        if (!isValidEmail(emails)){
            throw new RestApiException("Email phải đúng định dạng");
        }
        customer.setName(request.getName());
        customer.setBirthday(request.getBirthday());
        customer.setGender(request.getGender());
        customer.setAddress(request.getAddress());
        customer.setPhoneNumber(request.getPhoneNumber());
        customer.setEmail(request.getEmail());
        if(request.getNameBack() != null || request.getNameAccount() != null || request.getNumberAccount() != null) {
            if (isNullOrEmpty(request.getNameBack())) {
                throw new RestApiException("tên ngân hành không được để trống");
            }
            if (isNullOrEmpty(request.getNameAccount())) {
                throw new RestApiException("tên tài khoản ngân hàng không được để trống");
            }
            if (isNullOrEmpty(request.getNumberAccount())) {
                throw new RestApiException("Số tài khoản ngân hàng không được để trống");
            }
            customer.setNameBank(request.getNameBack());
            customer.setNameAccount(request.getNameAccount());
            customer.setNumberAccount(request.getNumberAccount());
        }
        customer.setUsername(request.getUsername());
        if(request.getAvatar()!=null && request.getAvatar().getBytes().length > 0) {
            customer.setAvatarUrl(cloudinary.uploader()
                    .upload(request.getAvatar().getBytes(),
                            Map.of("id", UUID.randomUUID().toString()))
                    .get("url")
                    .toString());
            customerLoginRepository.save(customer);
        }else if(request.getAvatar()==null && customer.getAvatarUrl()!=null){
            customerLoginRepository.save(customer);
        }else{
            customerLoginRepository.save(customer);
        }
        var jwtToken = jwtService.generateToken(customer);
        return CustomerAuthenticationReponse.builder()
                .token(jwtToken)
                .code(customer.getCode())
                .id(customer.getId())
                .name(customer.getName())
                .birthday(customer.getBirthday())
                .gender(customer.getGender())
                .address(customer.getAddress())
                .phoneNumber(customer.getPhoneNumber())
                .email(customer.getEmail())
                .avataUrl(customer.getAvatarUrl())
                .username(customer.getUsername())
                .nameAccount(customer.getNameAccount())
                .nameBack(customer.getNameBank())
                .numberAccount(customer.getNumberAccount())
                .status(customer.getStatus())
                .roleCustomer(customer.getRole())
                .build();
    }

    @Override
    public void sendResetPasswordEmail(CustomerForgetRequest request) {
        User user= customerLoginRepository.findByUsername(request.getUsername()).orElse(null);
        Random random = new Random();
        int number = random.nextInt(1000);
        String code = String.format("C%04d",number);
        user.setPassword(passwordEncoder.encode(code));
        if (user != null) {
            String resetPasswordLink = "Đây là mật khẩu mới của bạn:" + code;
            String emailBody = "Vui lòng đăng nhập lại với mật khẩu mới." + resetPasswordLink;

            Email email = new Email();
            email.setToEmail(new String[]{user.getEmail()});
            email.setSubject("Quên mật khẩu");
            email.setTitleEmail("Mật khẩu mới của bạn");
            email.setBody(emailBody);
            emailSender.sendEmail(email.getToEmail(), email.getSubject(), email.getTitleEmail(), email.getBody());
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

    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TypeToken.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        customerTokenRepository.save(token);
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = customerTokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        customerTokenRepository.saveAll(validUserTokens);
    }

}
