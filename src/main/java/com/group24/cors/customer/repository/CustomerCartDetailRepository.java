package com.group24.cors.customer.repository;

import com.group24.cors.customer.model.request.CustomerCartRequest;
import com.group24.cors.customer.model.response.CustomerCartDetailResponse;
import com.group24.entities.CartDetail;
import com.group24.repositories.CartDetailRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface CustomerCartDetailRepository extends CartDetailRepository {

    @Query(value = """
            SELECT * FROM cart_detail
            WHERE id_cart = :#{#idCart}
            """, nativeQuery = true)
    List<CartDetail> listCartDetail(String idCart);

    @Query(value = """
            SELECT * FROM cart_detail
             """, nativeQuery = true)
    List<CartDetail> getAllCartDetail();

    @Modifying
    @Transactional
    @Query(value = """
            DELETE cd FROM cart_detail cd
            JOIN cart c ON cd.id_cart = c.id
            JOIN [user] u ON c.id_user = u.id
            WHERE u.id = :#{#userId} 
            """, nativeQuery = true)
    void deleteAllCart(String userId);

    @Modifying
    @Transactional
    @Query(value = """
            DELETE cd FROM cart_detail cd
            JOIN cart c ON cd.id_cart = c.id
            JOIN [user] u ON c.id_user = u.id
            WHERE u.id = :#{#userId} AND homestay_id = :#{#homestayId}
            """, nativeQuery = true)
    void deleteCartByUser(String userId, String homestayId);

    @Query(value = """
            SELECT cd.id, cd.start_date, cd.end_date, cd.status, h.id AS id_homestay, h.name, h.price, h.number_person, 
            h.address, h.[desc] AS description, h.email, h.acreage, STRING_AGG(ih.img_url, ', ') AS image, 
            p.value AS promotion_value, COUNT(cm.id) AS quantity_cmt, ROUND(AVG(cm.point), 1) AS point
                            FROM cart_detail cd
                            JOIN cart c ON c.id = cd.id_cart
                            JOIN homestay h ON h.id =  cd.homestay_id
                            LEFT JOIN img_homestay ih ON h.id = ih.homestay_id
                            LEFT JOIN promotion p ON p.id = h.promotion_id
                            LEFT JOIN comment cm ON cm.homestay_id = h.id 
                            WHERE c.id_user = :#{#request.userId} 
                            GROUP BY cd.id, cd.start_date, cd.end_date, cd.status, h.id, h.name, h.price, h.number_person, h.address, h.[desc], h.email, h.acreage, p.value
            """, nativeQuery = true)
    Page<CustomerCartDetailResponse> getAllHomestayInCart(Pageable pageable, CustomerCartRequest request);

    @Query(value = """
            SELECT cd.*
            FROM cart_detail cd
            WHERE cd.[status] = 0
            AND EXISTS (
            	SELECT 1
            	FROM booking b
            	WHERE b.[status] = 1
            		AND (b.[start_date] <= cd.[start_date] AND b.end_date >= cd.[start_date])
            		OR (b.end_date >= cd.end_date AND b.[start_date] <= cd.end_date)
            		AND b.homestay_id = cd.homestay_id
            );
            """, nativeQuery = true)
    List<CartDetail> cartDetailBooked();

    @Transactional
    @Query(value = """
            DELETE cd FROM cart_detail cd
                JOIN cart c ON cd.id_cart = c.id
                JOIN [user] u ON c.id_user = u.id
                WHERE u.id = :#{#userId} 
            	AND cd.homestay_id = :#{#homestayId}
            	AND cd.[status] = 0
            	AND EXISTS 
            	(
                    SELECT 1 FROM booking b 
                    WHERE b.homestay_id = :#{#homestayId} 
                    AND b.[status] = 1 
                )
            """, nativeQuery = true)
    void deleteByHomestayId(String homestayId, String userId);

}
