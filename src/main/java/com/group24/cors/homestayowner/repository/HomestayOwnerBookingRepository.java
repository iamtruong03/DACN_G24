package com.group24.cors.homestayowner.repository;

import com.group24.cors.homestayowner.model.reponse.HomestayNumberOfBookingTodayReponse;
import com.group24.cors.homestayowner.model.reponse.HomestayOwnerStatisticalReponse;
import com.group24.cors.homestayowner.model.reponse.HomestayOwnerStatisticalTop5Reponse;
import com.group24.cors.homestayowner.model.reponse.HomestayOwnerUserBookingReponse;
import com.group24.cors.homestayowner.model.request.HomestayOwnerBookingRequest;
import com.group24.cors.homestayowner.model.request.HomestayOwnerStatisticalRequest;
import com.group24.cors.homestayowner.model.request.HomestayOwnerTop5StatisticalRequest;
import com.group24.entities.Booking;
import com.group24.repositories.BookingRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HomestayOwnerBookingRepository extends BookingRepository {

    @Query(value = "select a.* from booking a \n" +
            "left join  homestay b on a.homestay_id=b.id\n" +
            "left join owner_homestay c on b.owner_id=c.id\n" +
            "where c.id=:id ORDER BY a.last_modified_date DESC", nativeQuery = true)
    Page<Booking> getBookingByOwnerHomestay(String id, Pageable pageable);

    @Query(value = """
            SELECT
            d.name, d.address,d.birthday,d.email,d.gender,d.phone_number,COUNT(a.id) AS soLuot
            FROM
            booking a
            LEFT JOIN
            homestay b ON a.homestay_id = b.id
            LEFT JOIN
            owner_homestay c ON b.owner_id = c.id
            LEFT JOIN
            [user] d ON a.user_id = d.id
            WHERE
            c.id =:id and a.status=3
            GROUP BY
            d.name, d.address,d.birthday,d.email,d.gender,d.phone_number
            HAVING
            COUNT(a.id) >=5
            ORDER BY
            COUNT(a.id) DESC;
            """, nativeQuery = true)
    Page<HomestayOwnerUserBookingReponse> getBookingByUserMoreThan(String id, Pageable pageable);

    @Query(value = """
                     SELECT ROW_NUMBER() OVER(ORDER BY b.created_date DESC) AS stt, b.*
                     FROM booking b
                     JOIN dbo.homestay h ON b.homestay_id = h.id
                     JOIN owner_homestay c ON h.owner_id=c.id
                     JOIN dbo.[user] u ON b.user_id = u.id
                     WHERE c.id=:#{#request.idOwner} AND
                     ( ( :#{#request.userName} IS NULL OR :#{#request.userName} LIKE '' OR u.name = :#{#request.userName})
                     AND ( :#{#request.homestayName} IS NULL OR :#{#request.homestayName} LIKE '' OR h.name LIKE %:#{#request.homestayName}% )
                     AND ( :#{#request.sdtUser} IS NULL OR :#{#request.sdtUser} LIKE '' OR u.phone_number = :#{#request.sdtUser} OR b.phone_number = :#{#request.sdtUser})
                     AND ( :#{#request.nameBooking} IS NULL OR :#{#request.nameBooking} LIKE '' OR b.name LIKE %:#{#request.nameBooking}%)
                     AND (:#{#request.statusBooking} IS NULL OR b.status = :#{#request.statusBooking})
                     AND (
                         YEAR(DATEADD(SECOND, b.created_date / 1000, '1970-01-01')) = :#{#request.year}
                         AND (MONTH(DATEADD(SECOND, b.created_date / 1000, '1970-01-01')) = :#{#request.month} OR :#{#request.month} IS NULL OR :#{#request.month} LIKE '')
            )
            AND b.status <> 2
            ) ORDER BY b.last_modified_date DESC
                     """, nativeQuery = true)
    Page<Booking> getAllBooking(@Param("request") HomestayOwnerBookingRequest request, Pageable pageable);

    @Query(value = """
                     SELECT ROW_NUMBER() OVER(ORDER BY b.created_date DESC) AS stt, b.*
                     FROM booking b
                     JOIN dbo.homestay h ON b.homestay_id = h.id
                     JOIN owner_homestay c ON h.owner_id=c.id
                     JOIN dbo.[user] u ON b.user_id = u.id
                     WHERE c.id=:#{#request.idOwner}
                     AND (
                         YEAR(DATEADD(SECOND, b.created_date / 1000, '1970-01-01')) = :#{#request.year}
                         AND (MONTH(DATEADD(SECOND, b.created_date / 1000, '1970-01-01')) = :#{#request.month} OR :#{#request.month} IS NULL OR :#{#request.month} LIKE '')
            )
                     """, nativeQuery = true)
    Page<Booking> getBookingByYearAndMonth(@Param("request") HomestayOwnerBookingRequest request, Pageable pageable);

    @Query(value = "select count(a.id) as 'DoanhSo',SUM(a.total_price) as 'TongSoTien'  from booking a where a.homestay_id=:id", nativeQuery = true)
    HomestayOwnerStatisticalReponse getStatistical(String id);

    @Query(value = """
                    SELECT
                        COUNT(a.id) AS 'DoanhSo',
                        SUM(a.total_price - a.refund_price) AS 'TongSoTien'
                    FROM
                        booking a
                        INNER JOIN homestay b ON a.homestay_id = b.id
                        INNER JOIN owner_homestay c ON b.owner_id = c.id
                    WHERE
                        c.id = :#{#request.idOwnerHomestay}
                        AND (
                        YEAR(DATEADD(SECOND, a.created_date / 1000, '1970-01-01')) = :#{#request.year}
                        AND (MONTH(DATEADD(SECOND, a.created_date / 1000, '1970-01-01')) = :#{#request.month} OR :#{#request.month} IS NULL OR :#{#request.month} LIKE '')
                        AND (DAY(DATEADD(SECOND, a.created_date / 1000, '1970-01-01')) = :#{#request.date} OR :#{#request.date} IS NULL OR :#{#request.date} LIKE '')
            )
                        AND (a.status = 3 or a.status = 0);
                    """, nativeQuery = true)
    HomestayOwnerStatisticalReponse getAllStatistical(HomestayOwnerStatisticalRequest request);

    @Query(value = """
            SELECT
            COUNT(a.id) AS 'DoanhSo',
            SUM(a.total_price - a.refund_price) AS 'TongSoTien'
            FROM
            booking a
            inner join homestay b on a.homestay_id=b.id
            inner join owner_homestay c on b.owner_id=c.id
            WHERE
            c.id = :#{#request.idOwnerHomestay}
            AND MONTH(DATEADD(SECOND, a.created_date / 1000, '1970-01-01')) = :#{#request.month}
            AND DATEPART(YEAR, CONVERT(DATETIME, DATEADD(SECOND, a.created_date / 1000, '1970-01-01'))) = :#{#request.year}
            AND (a.status = 3 or a.status = 0);
            """, nativeQuery = true)
    HomestayOwnerStatisticalReponse getAllStatisticalYear(HomestayOwnerStatisticalRequest request);

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
                        INNER JOIN owner_homestay c ON b.owner_id = c.id
                        WHERE
                        c.id = :#{#request.idOwnerHomestay}
                        AND DATEPART(YEAR, CONVERT(DATETIME, DATEADD(SECOND, a.created_date / 1000, '1970-01-01'))) = :#{#request.year}
                        AND (a.status = 3 or a.status = 0)
                        GROUP BY
                            b.name,
                            b.address,
                            b.room_number
                        ORDER BY
                            SUM(a.total_price - a.refund_price) DESC
            """, nativeQuery = true)
    List<HomestayOwnerStatisticalTop5Reponse> getTop5StaticalYear(HomestayOwnerTop5StatisticalRequest request);

    @Query(value = """
                      SELECT
                          COUNT(a.homestay_id) AS bookToday
                      FROM
                          booking a
                          LEFT JOIN homestay b ON a.homestay_id = b.id
                          LEFT JOIN owner_homestay c ON b.owner_id = c.id
                      WHERE
                          c.id = :id
                        AND a.status = 3
                        AND DATEADD(DAY, 0, CONVERT(DATE, DATEADD(SECOND, a.start_date / 1000, '1970-01-01'))) <= CONVERT(DATE, GETUTCDATE())
                          and DATEADD(DAY, 0, CONVERT(DATE, DATEADD(SECOND, a.end_date / 1000, '1970-01-01'))) >= CONVERT(DATE, GETUTCDATE())
                      ORDER BY
                          COUNT(a.homestay_id) DESC;
            """, nativeQuery = true)
    HomestayNumberOfBookingTodayReponse getNumberOfBookingsToday(String id);

    @Query(value = """
                      SELECT
                          COUNT(a.homestay_id) AS bookToday
                      FROM
                          booking a
                          LEFT JOIN homestay b ON a.homestay_id = b.id
                          LEFT JOIN owner_homestay c ON b.owner_id = c.id
                      WHERE
                        c.id =:id
                        AND a.status = 3
                        AND DATEADD(DAY, 0, CONVERT(DATE, DATEADD(SECOND, a.start_date / 1000, '1970-01-01'))) > CONVERT(DATE, GETUTCDATE())
                      ORDER BY
                        COUNT(a.homestay_id) DESC;
            """, nativeQuery = true)
    HomestayNumberOfBookingTodayReponse getNumberOfBookingCho(String id);

    @Query(value = """
            SELECT * FROM booking
            WHERE homestay_id = :#{#homestayId} AND [status] = 1
            """, nativeQuery = true)
    List<Booking> getBookingActive(@Param("homestayId") String homestayId);

}
