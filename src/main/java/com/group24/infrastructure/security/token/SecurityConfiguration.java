package com.group24.infrastructure.security.token;

import com.group24.infrastructure.contant.role.*;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfiguration {

    private final JwAuthenticationFilter jwtAuthFilter;

    private final AuthenticationProvider authenticationProvider;

    private final LogoutHandler logoutHandler;

    private static final String[] WHITE_LIST_URL =
            {
                    "/api/v2/login/**",
                    "/api/v1/login/**",
                    "/api/v3/login/**"
            };

    private static final String[] OWNER_ROLE =
            {
                    "/api/v2/homestay/**",
                    "/api/v2/booking/**",
                    "/api/v2/convenient/**",
                    "/api/v2/convenient/**",
                    "/api/v2/img",
                    "/api/v2/owner/**",
                    "/api/v2/change-pass/**",
                    "/api/v2/promotion/**",
                    "/api/v2/statictical/**",
                    "/api/v2/comment/**",
                    "/api/v2/promotion"
            };

    private static final String[] ADMIN_ROLE =
            {
                    "/api/v3/booking/**",
                    "/api/v3/homestay/**",
                    "/api/v3/convenient-homestay/**",
                    "/api/v3/change-pass/**",
                    "/api/v3/promotion/**",
                    "/api/v3/statistical/**",
                    "/api/v3/information/**",
                    "api/v3/owner-homestay/**",
                    "api/v3/comment/**",
                    "api/v3/comment"
            };

    private  static final String[] All_GET={
            "/api/v1/convenient-homestay/**",
            "/api/v1/convenient-homestay-type",
            "/api/v1/homestay/**",
            "/api/v1/homestay",
            "/api/v1/img-comment/**",
            "/api/v1/img-homestay/**",
            "/api/v1/change-pass/**",
            "/api/v1/img-comment/**",
            "/api/v1/comment/**"
    };

    private static final String[] CUSTOMER_ROLE =
            {
                    "/api/v1/booking/**",
                    "/api/v1/cart/**",
                    "/api/v1/convenient-homestay/**",
                    "/api/v1/customer/update-information-owner",
                    "/api/v1/homestay/**",
                    "/api/v1/homestay",
                    "/api/v1/promotion",
                    "/api/v1/img-comment/**",
                    "/api/v1/img-homestay/**",
                    "/api/v1/change-pass/**",
                    "/api/v1/payment/**"
            };

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors()
                .and()
                .authorizeHttpRequests(res ->
                 res.requestMatchers(WHITE_LIST_URL).permitAll()
                .requestMatchers(HttpMethod.GET, All_GET).permitAll()
                .requestMatchers(CUSTOMER_ROLE).hasAnyRole(RoleCustomer.CUSTOMER.name())
                .requestMatchers(HttpMethod.GET,CUSTOMER_ROLE).hasAnyAuthority(PermissionCustomer.CUSTOMER_READ.name())
                .requestMatchers(HttpMethod.POST, CUSTOMER_ROLE).hasAnyAuthority(PermissionCustomer.CUSTOMER_CREATE.name())
                .requestMatchers(HttpMethod.PUT, CUSTOMER_ROLE).hasAnyAuthority(PermissionCustomer.CUSTOMER_UPDATE.name())
                .requestMatchers(OWNER_ROLE).hasAnyRole(RoleOwner.OWNER.name())
                .requestMatchers(HttpMethod.GET, OWNER_ROLE).hasAnyAuthority(PermissionOwner.OWNER_READ.name())
                .requestMatchers(HttpMethod.POST, OWNER_ROLE).hasAnyAuthority(PermissionOwner.OWNER_CREATE.name())
                .requestMatchers(HttpMethod.PUT, OWNER_ROLE).hasAnyAuthority(PermissionOwner.OWNER_UPDATE.name())
                .requestMatchers(ADMIN_ROLE).hasAnyRole(RoleAdmin.ADMIN.name())
                .requestMatchers(HttpMethod.GET, ADMIN_ROLE).hasAnyAuthority(PermissionAdmin.ADMIN_READ.name())
                .requestMatchers(HttpMethod.POST, ADMIN_ROLE).hasAnyAuthority(PermissionAdmin.ADMIN_CREATE.name())
                .requestMatchers(HttpMethod.PUT, ADMIN_ROLE).hasAnyAuthority(PermissionAdmin.ADMIN_UPDATE.name())
                .anyRequest()
                .authenticated())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .logout(logout ->
                        logout.logoutUrl("/api/v1/auth/logout")
                        .addLogoutHandler(logoutHandler)
                        .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext())
        );
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH"));
        configuration.setAllowedHeaders(Arrays.asList("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}

