package com.group24.cors.admin.repository;

import com.group24.cors.admin.model.request.AdminConvenientHomestayRequest;
import com.group24.cors.admin.model.response.AdminConvenientHomestayResponse;
import com.group24.entities.ConvenientHomestay;
import com.group24.repositories.ConvenientHomestayRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminConvenientHomestayRepository extends ConvenientHomestayRepository {

    @Query(value = """
            SELECT ROW_NUMBER() OVER(ORDER BY cvh.last_modified_date DESC) AS stt, cvh.*
            FROM dbo.convenient_homestay cvh
            """,nativeQuery = true)
    Page<ConvenientHomestay> getAllConvenientHomestay(Pageable pageable, AdminConvenientHomestayRequest adminConvenientHomestayRequest);

    boolean existsByName(String name);

}
