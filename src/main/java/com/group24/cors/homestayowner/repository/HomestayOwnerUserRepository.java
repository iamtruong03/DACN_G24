package com.group24.cors.homestayowner.repository;

import com.group24.entities.Booking;
import com.group24.repositories.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface HomestayOwnerUserRepository extends UserRepository {

    boolean existsByUsername(String username);

}
