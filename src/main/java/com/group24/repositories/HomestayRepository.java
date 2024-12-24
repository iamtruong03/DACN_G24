package com.group24.repositories;

import com.group24.entities.Homestay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository(HomestayRepository.NAME)
public interface HomestayRepository extends JpaRepository<Homestay, String> {
    public static final String NAME = "BaseHomestayRepository";

}
