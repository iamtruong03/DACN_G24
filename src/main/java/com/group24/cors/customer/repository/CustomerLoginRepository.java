package com.group24.cors.customer.repository;

import com.group24.entities.OwnerHomestay;
import com.group24.entities.User;
import com.group24.repositories.UserRepository;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Primary
@Repository

public interface CustomerLoginRepository extends UserRepository {

    @Override
    Optional<User> findByUsername(String username);

    Optional<User> findById(String id);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    boolean existsByPhoneNumber(String phonenumber);

    @Query(value ="select b.* from token a\n" +
            "right join [user] b on a.user_id=b.id \n" +
            "where a.token=:token",nativeQuery = true)
    User findUserByToken(String token);
}
