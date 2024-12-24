package com.group24.cors.homestayowner.repository;

import com.group24.cors.homestayowner.model.request.HomestayOwnerPromotionSearchRequest;
import com.group24.entities.Promotion;
import com.group24.infrastructure.contant.StatusPromotion;
import com.group24.repositories.PromotionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HomestayOwnerPromotionRepository extends PromotionRepository {

    @Query(value = "select * from promotion where owner_id=:id ORDER BY last_modified_date DESC",nativeQuery = true)
    List<Promotion> getAllPromotion(String id);

    Boolean existsByName(String name);

    @Query(value = """
            SELECT *
            FROM promotion a
            WHERE a.owner_id = :#{#request.idOwner}
            AND (
            (a.name LIKE %:#{#request.name}% OR :#{#request.name} IS NULL OR a.name like '')
            AND (:#{#request.status} is null or a.status_promotion=:#{#request.status})
            ) ORDER BY a.last_modified_date DESC
    """,nativeQuery = true)
    Page<Promotion> getBookingByNameAndStatus(@Param("request") HomestayOwnerPromotionSearchRequest request, Pageable pageable);

    @Query(value = """
    SELECT *
    FROM Promotion a
    WHERE DATEADD(DAY, 0, CONVERT(DATE, DATEADD(SECOND, a.start_date / 1000, '1970-01-01'))) = CONVERT(DATE, GETUTCDATE())
    AND a.status_promotion = 2;
    """, nativeQuery = true)
    List<Promotion> findByStartDateLessThanAndStatusPromotion();

    @Query(value = """
    SELECT *
    FROM Promotion a
    WHERE 
    (DATEADD(DAY, 0, CONVERT(DATE, DATEADD(SECOND, a.end_date / 1000, '1970-01-01'))) < CONVERT(DATE, GETUTCDATE()))
    AND a.status_promotion = 0;
    """, nativeQuery = true)
    List<Promotion> findByEndDateLessThanAndStatusPromotion();

}