package com.group24.repositories;

import com.group24.entities.Admin;
import com.group24.entities.OwnerHomestay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository(AdminRepository.NAME)
public interface AdminRepository extends JpaRepository<Admin, String> {
    public static final String NAME = "BaseAdminRepository";

    Optional<Admin> findByUsername(String username);
}
