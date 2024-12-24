package com.group24.cors.homestayowner.repository;


import com.group24.repositories.AdminRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HomestayOwnerAdminRepository extends AdminRepository {

    boolean existsByUsername(String username);
}
