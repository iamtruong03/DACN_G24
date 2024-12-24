package com.group24.repositories;

import com.group24.entities.OwnerHomestay;
import com.group24.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository(UserRepository.NAME)
public interface UserRepository extends JpaRepository<User, String> {
    public static final String NAME = "BaseUserRepository";

    Optional<User> findByUsername(String username);
}
