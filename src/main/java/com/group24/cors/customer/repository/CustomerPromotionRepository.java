package com.group24.cors.customer.repository;

import com.group24.repositories.PromotionRepository;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

@Repository
@Primary
public interface CustomerPromotionRepository extends PromotionRepository {
}
