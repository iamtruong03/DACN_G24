package com.group24.cors.customer.repository;

import com.group24.cors.customer.model.request.CustomerBookingRequest;
import com.group24.cors.customer.model.request.CustomerCartRequest;
import com.group24.entities.Booking;
import com.group24.entities.Cart;
import com.group24.repositories.CartRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerCartRepository extends CartRepository {

    @Query(value = """
            SELECT * FROM cart
            WHERE id_user = :#{#request.userId} 
            """, nativeQuery = true)
    Cart findByUserId(@Param("request") CustomerCartRequest request);

    @Query(value = """
            SELECT a.* FROM booking a
            WHERE (a.status = 1)
            AND (a.homestay_id =:#{#customerBookingRequest.homestayId})
            AND (:#{#customerBookingRequest.startDate} > a.start_date AND a.end_date >:#{#customerBookingRequest.startDate}
            OR :#{#customerBookingRequest.endDate} > a.start_date AND a.end_date > :#{#customerBookingRequest.endDate}
            OR (a.start_date >= :#{#customerBookingRequest.startDate} AND a.end_date <= :#{#customerBookingRequest.endDate}))
            """, nativeQuery = true)
    List<Booking> getOneBooking(CustomerBookingRequest customerBookingRequest);

}
