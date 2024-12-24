package com.group24.infrastructure.contant.role;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor

public enum RoleCustomer {
    CUSTOMER(
        Set.of(
            PermissionCustomer.CUSTOMER_READ,
            PermissionCustomer.CUSTOMER_CREATE,
            PermissionCustomer.CUSTOMER_UPDATE
        )
    );
    @Getter
    private final Set<PermissionCustomer> permissionCustomers;

    public List<SimpleGrantedAuthority> getAuthorities(){
        var authorities = getPermissionCustomers()
                .stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toList());
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return authorities;
    }
}
