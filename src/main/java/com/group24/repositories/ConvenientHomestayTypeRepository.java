package com.group24.repositories;

import com.group24.entities.ConvenientHomestayType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository(ConvenientHomestayTypeRepository.NAME)
public interface ConvenientHomestayTypeRepository extends JpaRepository<ConvenientHomestayType, String> {
    public static final String NAME = "BaseConvenientHomestayTypeRepository";
}
