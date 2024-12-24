package com.group24.cors.homestayowner.repository;

import com.group24.repositories.DetailHomestayRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface HomestayOwnerDetailHomestayReposritory extends DetailHomestayRepository {

    @Query(value = "Delete from detail_homestay where homestay_id=:idHomestay",nativeQuery = true)
    @Modifying
    int deleteByHomestay(String idHomestay);

}
