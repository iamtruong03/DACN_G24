package com.group24.cors.admin.repository;

import com.group24.cors.admin.model.request.AdminBookingByHomestayRequest;
import com.group24.cors.admin.model.request.AdminBookingRequest;
import com.group24.cors.admin.model.request.AdminStatisticalRequest;
import com.group24.cors.admin.model.request.AdminStatisticalTop5Request;
import com.group24.cors.admin.model.response.AdminBookingResponse;
import com.group24.cors.admin.model.response.AdminStatisticalReponse;
import com.group24.cors.admin.model.response.AdminStatisticalTop5Response;
import com.group24.entities.Booking;
import com.group24.repositories.BookingRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminBookingRepository extends BookingRepository {

    @Query(value = """
                    SELECT ROW_NUMBER() OVER(ORDER BY b.last_modified_date DESC) AS stt, b.* 
                    FROM booking b
                    JOIN dbo.homestay h ON b.homestay_id = h.id 
                    JOIN dbo.[user] u ON b.user_id = u.id
                    WHERE ( ( :#{#request.userName} IS NULL OR :#{#request.userName} LIKE '' OR u.name = :#{#request.userName})
                    AND ( :#{#request.homestayName} IS NULL OR :#{#request.homestayName} LIKE '' OR h.name LIKE %:#{#request.homestayName}% )
                    AND ( :#{#request.sdtUser} IS NULL OR :#{#request.sdtUser} LIKE '' OR u.phone_number = :#{#request.sdtUser} OR b.phone_number = :#{#request.sdtUser})
                    AND ( :#{#request.nameBooking} IS NULL OR :#{#request.nameBooking} LIKE '' OR b.name LIKE %:#{#request.nameBooking}%)
                    AND (:#{#request.statusBooking} IS NULL OR b.status = :#{#request.statusBooking}) 
                    AND (:#{#request.statusPayUser} IS NULL OR b.status_pay_user = :#{#request.statusPayUser})
                    AND (:#{#request.statusPayOwner} IS NULL OR b.status_pay_owner = :#{#request.statusPayOwner})
                    AND (b.status <> 2))
                    """, nativeQuery = true)
    Page<Booking> getAllBooking(@Param("request") AdminBookingRequest request, Pageable pageable);

    @Query(value = """
                    SELECT ROW_NUMBER() OVER(ORDER BY b.last_modified_date DESC) AS stt, u.name AS user_name, b.id, b.status, b.created_date, b.start_date, b.end_date,b.total_price, h.name AS homestay_name
                    FROM booking b 
                    JOIN [user] u ON b.user_id = u.id 
                    JOIN homestay h ON b.homestay_id = h.id 
                    where h.id= :#{#req.homestayId}
                    """,nativeQuery = true)
    Page<AdminBookingResponse> getAllBookingByHomestay(@Param("req") AdminBookingByHomestayRequest req, Pageable pageable);

    @Query(value = "select count(a.id) as 'DoanhSo',SUM(a.total_price) as 'TongSoTien'  from booking a where a.homestay_id=:id", nativeQuery = true)
    AdminStatisticalReponse getStatistical(String id);

    @Query(value = """
            SELECT
                COUNT(a.id) AS 'DoanhSo',
                SUM(a.total_price - a.refund_price) AS 'TongSoTien'
            FROM
                booking a
                INNER JOIN homestay b ON a.homestay_id = b.id
            WHERE
                (
                YEAR(DATEADD(SECOND, a.created_date / 1000, '1970-01-01')) = :#{#request.year}
                AND (MONTH(DATEADD(SECOND, a.created_date / 1000, '1970-01-01')) = :#{#request.month} OR :#{#request.month} IS NULL OR :#{#request.month} LIKE '')
                AND (DAY(DATEADD(SECOND, a.created_date / 1000, '1970-01-01')) = :#{#request.date} OR :#{#request.date} IS NULL OR :#{#request.date} LIKE '')
				)
                AND (a.status = 3 or a.status = 0);                 
            """, nativeQuery = true)
    AdminStatisticalReponse getAllStatistical(AdminStatisticalRequest request);

    @Query(value = """
            SELECT
            COUNT(a.id) AS 'DoanhSo',
            SUM(a.total_price - a.refund_price) AS 'TongSoTien'
            FROM
            booking a
            inner join homestay b on a.homestay_id=b.id
            WHERE
             MONTH(DATEADD(SECOND, a.created_date / 1000, '1970-01-01')) = :#{#request.month}
            AND DATEPART(YEAR, CONVERT(DATETIME, DATEADD(SECOND, a.created_date / 1000, '1970-01-01'))) = :#{#request.year}
            AND (a.status = 3 or a.status = 0);                     
            """, nativeQuery = true)
    AdminStatisticalReponse getAllStatisticalYear(AdminStatisticalRequest request);

    @Query(value = """
                SELECT TOP 5
                b.name,
                b.address,
                b.room_number AS "roomNumber",
                COUNT(a.id) AS 'DoanhSo',
                SUM(a.total_price - a.refund_price) AS 'TongSoTien'
                FROM
                booking a
                INNER JOIN homestay b ON a.homestay_id = b.id
                WHERE
                DATEPART(YEAR, CONVERT(DATETIME, DATEADD(SECOND, a.created_date / 1000, '1970-01-01'))) = :#{#request.year}
                AND (a.status = 3 or a.status = 0)
                GROUP BY
                    b.name,
                    b.address,
                    b.room_number
                ORDER BY
                    SUM(a.total_price) DESC
    """,nativeQuery = true)
    List<AdminStatisticalTop5Response> getTop5StaticalYear(AdminStatisticalTop5Request request);

}
