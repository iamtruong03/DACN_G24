package com.group24.cors.admin.repository;

import com.group24.cors.admin.model.request.AdminHomestayRequest;
import com.group24.entities.Homestay;
import com.group24.repositories.HomestayRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminHomestayRepository extends HomestayRepository {

    @Query(value = """
            SELECT ROW_NUMBER() OVER(ORDER BY h.last_modified_date DESC) AS stt, h.* FROM homestay h 
            JOIN owner_homestay oh ON h.owner_id = oh.id
            WHERE ( ( :#{#request.statusHomestay} IS NULL OR h.status = :#{#request.statusHomestay} )
            AND ( :#{#request.nameHomestay} IS NULL OR :#{#request.nameHomestay} LIKE '' OR h.name LIKE %:#{#request.nameHomestay}% )
            AND ( :#{#request.nameOwner} IS NULL OR oh.name LIKE '' OR oh.name LIKE %:#{#request.nameOwner}% ) )
            """, nativeQuery = true)
    Page<Homestay> getAllHomestay(Pageable pageable, @Param("request") AdminHomestayRequest request);

    @Query(value = """
            SELECT * FROM homestay 
            WHERE status = 0
            """, nativeQuery = true)
    List<Homestay> getAllHomsestayByAdmin();

    @Query(value = """
            SELECT h.* FROM homestay h 
            WHERE  h.owner_id= :#{#id}
            """, nativeQuery = true)
    List<Homestay> findHomestayBy(String id);

    @Query(value = """
            SELECT COUNT(h.id) AS 'CountHoatDong' 
            FROM dbo.homestay h 
            WHERE h.[status] = 0
            """,nativeQuery = true)
    Integer countHoatDong();

    @Query(value = """
            SELECT COUNT(h.id) AS 'CountChoDuyet' 
            FROM dbo.homestay h 
            WHERE h.[status] = 1
            """,nativeQuery = true)
    Integer countChoDuyet();

}
