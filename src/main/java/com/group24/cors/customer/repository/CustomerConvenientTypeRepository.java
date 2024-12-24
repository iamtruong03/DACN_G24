package com.group24.cors.customer.repository;

import com.group24.entities.ConvenientHomestayType;
import com.group24.repositories.ConvenientHomestayTypeRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerConvenientTypeRepository extends ConvenientHomestayTypeRepository {

    @Query(value = """
            SELECT * FROM convenient_homestay_type
            ORDER BY last_modified_date DESC
            """, nativeQuery = true)
    List<ConvenientHomestayType> getAll();
}
