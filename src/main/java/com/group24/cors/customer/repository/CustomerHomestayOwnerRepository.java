package com.group24.cors.customer.repository;

import com.group24.repositories.OwnerHomestayRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerHomestayOwnerRepository extends OwnerHomestayRepository {

    boolean existsByUsername(String username);
}
