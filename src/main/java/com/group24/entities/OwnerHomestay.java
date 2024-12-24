package com.group24.entities;

import com.group24.entities.base.PrimaryEntity;
import com.group24.infrastructure.contant.EntityProperties;
import com.group24.infrastructure.contant.Status;
import com.group24.infrastructure.contant.role.RoleOwner;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Entity
@Table(name = "owner_homestay")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OwnerHomestay extends PrimaryEntity implements UserDetails {

    @Column(length = EntityProperties.LENGTH_CODE)
    @Nationalized
    private String code;

    @Column(length = EntityProperties.LENGTH_NAME)
    @Nationalized
    private String name;

    private Long birthday;

    private Boolean gender;

    @Nationalized
    private String address;

    @Column(length = EntityProperties.LENGTH_PHONE)
    @Nationalized
    private String phoneNumber;

    @Column(length = EntityProperties.LENGTH_EMAIL)
    @Nationalized
    private String email;

    @Nationalized
    private String username;

    @Nationalized
    private String password;

    @Nationalized
    private String avatarUrl;

    private Status status;

    private RoleOwner role;

    private String nameBank;

    private String nameAccount;

    private String numberAccount;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role.getAuthorities();
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
