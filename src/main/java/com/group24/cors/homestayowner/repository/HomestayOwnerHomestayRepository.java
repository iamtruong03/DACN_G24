package com.group24.cors.homestayowner.repository;

import com.group24.cors.homestayowner.model.reponse.HomestayOwnerHomestayReponse;
import com.group24.cors.homestayowner.model.request.HomestayOwnerHomestayGetRequest;
import com.group24.entities.Homestay;
import com.group24.repositories.HomestayRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HomestayOwnerHomestayRepository extends HomestayRepository {

    @Query(value = """
            Select * from homestay a
            where a.owner_id=:#{#request.id}
            and (a.status=:#{#request.status} or :#{#request.status} is null or :#{#request.status} like '')
            ORDER BY a.last_modified_date DESC
            """, nativeQuery = true)
    Page<Homestay> getHomestayByOwnerH(HomestayOwnerHomestayGetRequest request, Pageable pageable);

    @Query(value = "select a.* from homestay a \n" +
            "left join detail_homestay b on a.id=b.homestay_id \n" +
            "left join convenient_homestay c on b.convenient_homestay_id=c.id\n" +
            "where c.id=:id and a.status=1 \n" +
            "ORDER BY a.last_modified_date DESC", nativeQuery = true)
    Page<HomestayOwnerHomestayReponse> getHomestayByConvient(String id, Pageable pageable);

    @Query(value = """
            select a.* from homestay a where a.promotion_id=:id ORDER BY a.last_modified_date DESC
            """, nativeQuery = true)
    List<Homestay> getHomestayByPromotion(String id);
}
