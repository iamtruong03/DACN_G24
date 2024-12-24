package com.group24.infrastructure.contant.role;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public enum RoleOwner {
    OWNER(
            Set.of(
                   PermissionOwner.OWNER_READ,
                   PermissionOwner.OWNER_CREATE,
                   PermissionOwner.OWNER_UPDATE
            )
    );

    @Getter
    private final Set<PermissionOwner> permissionOwners;

    public List<SimpleGrantedAuthority> getAuthorities(){
            var authorities = getPermissionOwners()
                    .stream()
                    .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                    .collect(Collectors.toList());
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return authorities;
    }
}
