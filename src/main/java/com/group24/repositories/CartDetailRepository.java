package com.group24.repositories;

import com.group24.entities.CartDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository(CartDetailRepository.NAME)
public interface CartDetailRepository extends JpaRepository<CartDetail, String> {
    public static final String NAME = "BaseCartDetailRepository";
}
