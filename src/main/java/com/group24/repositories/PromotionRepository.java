package com.group24.repositories;

import com.group24.entities.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository(PromotionRepository.NAME)
public interface PromotionRepository extends JpaRepository<Promotion, String> {
    public static final String NAME = "BasePromotionRepository";

}
