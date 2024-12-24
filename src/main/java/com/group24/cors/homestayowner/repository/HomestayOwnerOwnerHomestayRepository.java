package com.group24.cors.homestayowner.repository;

import com.group24.entities.OwnerHomestay;
import com.group24.repositories.OwnerHomestayRepository;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Primary
@Repository
public interface HomestayOwnerOwnerHomestayRepository extends OwnerHomestayRepository {

       @Override
       Optional<OwnerHomestay> findByUsername(String username);

       Optional<OwnerHomestay> findById(String resetPassToken);

       boolean existsByUsername(String username);

       boolean existsByEmail(String email);

       boolean existsByPhoneNumber(String phonenumber);

       @Query(value ="select b.* from token a\n" +
               "right join owner_homestay b on a.owner_id=b.id \n" +
               "where a.token=:token",nativeQuery = true)
       OwnerHomestay findOwnerByToken(String token);


}
