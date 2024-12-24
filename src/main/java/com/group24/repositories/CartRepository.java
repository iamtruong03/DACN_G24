package com.group24.repositories;

import com.group24.entities.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository(CartRepository.NAME)
public interface CartRepository extends JpaRepository<Cart, String> {
    public static final String NAME = "BaseCartRepository";
}
