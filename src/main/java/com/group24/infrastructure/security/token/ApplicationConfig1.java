package com.group24.infrastructure.security.token;

import com.group24.entities.Admin;
import com.group24.entities.OwnerHomestay;
import com.group24.entities.User;
import com.group24.repositories.AdminRepository;
import com.group24.repositories.OwnerHomestayRepository;
import com.group24.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig1 {

    private final UserRepository userRepository;

    private final OwnerHomestayRepository ownerHomestayRepository;

    private final AdminRepository adminRepository;

    @Bean
    UserDetailsService userDetailsService() {
        return username -> {
            Optional<OwnerHomestay> ownerHomestay = ownerHomestayRepository.findByUsername(username);
            if (ownerHomestay.isPresent()) {
                return ownerHomestay.get();
            }
            Optional<User> user = userRepository.findByUsername(username);
            if (user.isPresent()) {
                return user.get();
            }
            Optional<Admin> admin = adminRepository.findByUsername(username);
            if (admin.isPresent()) {
                return admin.get();
            }

            throw new UsernameNotFoundException("User not found");
        };
    }

    @Bean
    AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    AuthenticationManager authenticationManager(@org.jetbrains.annotations.NotNull AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
