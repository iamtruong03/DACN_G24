package com.group24.cors.customer.repository;

import com.group24.entities.Token;
import com.group24.repositories.TokenRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerTokenRepository extends TokenRepository {
    @Query(value = """
      select t from Token t inner join  User u\s
      on t.user.id = u.id\s
      where u.id = :id and (t.expired = false or t.revoked = false)\s
      """)
    List<Token> findAllValidTokenByUser(String id);
}
