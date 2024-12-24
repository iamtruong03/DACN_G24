package com.group24.repositories;

import com.group24.entities.ScenicSpot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository(ScenicSpotRepository.NAME)
public interface ScenicSpotRepository extends JpaRepository<ScenicSpot , String> {
    public static final String NAME = "BaseScenicSpotRepository";
}
