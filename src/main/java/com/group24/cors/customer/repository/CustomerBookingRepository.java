package com.group24.cors.customer.repository;

import com.group24.cors.customer.model.request.CustomerBookingRequest;
import com.group24.cors.customer.model.response.CustomerBillBookingResponse;
import com.group24.entities.Booking;
import com.group24.repositories.BookingRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerBookingRepository extends BookingRepository {

    @Query(value = """
            SELECT ROW_NUMBER() OVER(ORDER BY b.created_date DESC) AS stt, b.*
            FROM booking b
            WHERE b.[user_id] = :#{#customerBookingRequest.userId}
            AND b.[status] = 1 OR b.[status] = 0
            """, nativeQuery = true)
    Page<Booking> getBookingByUserId(Pageable pageable, CustomerBookingRequest customerBookingRequest);

    @Query(value = """
            SELECT * FROM booking a
            WHERE a.id =:bookingId AND a.status = 1
            """, nativeQuery = true)
    Optional<Booking> findByIdAndCancel(@Param("bookingId") String bookingId);

    @Query(value = """
            SELECT * FROM booking
            """, nativeQuery = true)
    List<Booking> getAllBooking();

    @Query(value = """
            SELECT * FROM dbo.booking WHERE [status] = 1
            """, nativeQuery = true)
    List<Booking> getAllBookingSuccess();

    @Query(value = """
               SELECT b.[name] AS name_user, b.phone_number, b.email,
            FORMAT(CONVERT(DATE, DATEADD(SECOND, b.created_date / 1000, '19700101')), 'dd-MM-yyyy') AS created_date,
            FORMAT(CONVERT(DATE, DATEADD(SECOND, b.[start_date] / 1000, '19700101')), 'dd-MM-yyyy') AS [start_date],
            FORMAT(CONVERT(DATE, DATEADD(SECOND, b.[end_date] / 1000, '19700101')), 'dd-MM-yyyy') AS [end_date],
            b.total_price, b.type_booking, b.code, b.payment_method,
            CASE WHEN b.promotion_id IS NULL THEN (h.price * b.number_of_night + 0.11 * h.price * b.number_of_night)
            	WHEN b.promotion_id IS NOT NULL THEN ((h.price - p.[value]) * b.number_of_night + 0.11 * (h.price - p.[value]) * b.number_of_night)
            	END AS sum_price, h.[name] AS name_homestay, h.[address] AS adress_homestay, u.[address] AS address_user
            FROM booking b
            JOIN [user] u ON b.[user_id] = u.id
            JOIN homestay h ON b.homestay_id = h.id
            LEFT JOIN promotion p ON b.promotion_id = p.id
            WHERE b.id = :bookingId     
            """, nativeQuery = true)
    CustomerBillBookingResponse getOneBooking(@Param("bookingId") String bookingId);

}
