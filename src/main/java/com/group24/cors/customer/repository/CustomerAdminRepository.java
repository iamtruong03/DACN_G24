package com.group24.cors.customer.repository;

import com.group24.repositories.AdminRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerAdminRepository extends AdminRepository {

    boolean existsByUsername(String username);
}
