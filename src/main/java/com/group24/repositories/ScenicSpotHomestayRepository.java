package com.group24.repositories;

import com.group24.entities.ScenicSpotHomestay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository(ScenicSpotHomestayRepository.NAME)
public interface ScenicSpotHomestayRepository extends JpaRepository<ScenicSpotHomestay, String> {
    public static final String NAME = "BaseScenicSpotHomestayRepository";

}
