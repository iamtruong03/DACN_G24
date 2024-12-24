package com.group24.cors.admin.repository;

import com.group24.cors.admin.model.request.AdminUserRequest;
import com.group24.entities.User;
import com.group24.repositories.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminUserRepository extends UserRepository {
    @Query(value = """
            SELECT ROW_NUMBER() OVER(ORDER BY u.last_modified_date DESC) AS stt, u.* FROM [user] u \s
            WHERE ( :#{#request.userName} IS NULL OR u.name LIKE '' OR u.name LIKE %:#{#request.userName}% )
            """, nativeQuery = true)
    Page<User> getAllUser(Pageable pageable, AdminUserRequest request);

    boolean existsByUsername(String username);
}
