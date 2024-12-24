package com.group24.repositories;

import com.group24.entities.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository(TokenRepository.NAME)
public interface TokenRepository extends JpaRepository<Token, String> {

    public static final String NAME = "BaseTokenRepository";

    Optional<Token> findByToken(String token);
}
