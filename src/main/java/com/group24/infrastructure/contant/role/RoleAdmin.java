package com.group24.infrastructure.contant.role;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public enum RoleAdmin {
    ADMIN(
            Set.of(
                    PermissionAdmin.ADMIN_READ,
                    PermissionAdmin.ADMIN_CREATE,
                    PermissionAdmin.ADMIN_UPDATE
            )
    );

    @Getter
    private final Set<PermissionAdmin> permissionAdmins;

    public List<SimpleGrantedAuthority> getAuthorities(){
        var authorities = getPermissionAdmins()
                .stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toList());
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return authorities;
    }
}
