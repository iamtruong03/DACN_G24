package com.group24.cors.admin.repository;

import com.group24.cors.admin.model.request.AdminConvenientHomestayRequest;
import com.group24.cors.admin.model.request.AdminConvenientHomestayTypeRequest;
import com.group24.entities.ConvenientHomestay;
import com.group24.entities.ConvenientHomestayType;
import com.group24.repositories.ConvenientHomestayTypeRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminConvenientHomestayTypeRespository extends ConvenientHomestayTypeRepository {

    @Query(value = """
            SELECT ROW_NUMBER() OVER(ORDER BY cvt.last_modified_date DESC) AS stt, cvt.*
            FROM dbo.convenient_homestay_type cvt
            """,nativeQuery = true)
    Page<ConvenientHomestayType> getAllConvenientHomestayType(Pageable pageable , AdminConvenientHomestayTypeRequest request);

    boolean existsByName(String nameType);

}
