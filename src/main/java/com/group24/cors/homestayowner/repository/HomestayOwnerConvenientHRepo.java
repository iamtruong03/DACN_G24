package com.group24.cors.homestayowner.repository;

import com.group24.cors.homestayowner.model.reponse.HomestayOwnerConvenientReponse;
import com.group24.cors.homestayowner.model.reponse.HomestayOwnerHomestayReponse;
import com.group24.repositories.ConvenientHomestayRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Repository
public interface HomestayOwnerConvenientHRepo extends ConvenientHomestayRepository {

    @Query(value = "select a.id,a.name as name,b.name as type from convenient_homestay a \n" +
            "inner join convenient_homestay_type b on a.convenient_homestay_type_id=b.id \n" +
            "ORDER BY a.last_modified_date DESC", nativeQuery = true)
    List<HomestayOwnerConvenientReponse> getConvenientHomestay();
}
