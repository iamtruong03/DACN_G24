package com.group24.repositories;

import com.group24.entities.DetailHomestay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository(DetailHomestayRepository.NAME)
public interface DetailHomestayRepository extends JpaRepository<DetailHomestay, String> {
    public static final String NAME = "BaseDetailHomestayRepository";

}
