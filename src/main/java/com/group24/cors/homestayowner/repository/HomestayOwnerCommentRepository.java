package com.group24.cors.homestayowner.repository;

import com.group24.cors.homestayowner.model.request.HomestayOwnerDeleteCommentRequest;
import com.group24.entities.Comment;
import com.group24.repositories.CommentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface HomestayOwnerCommentRepository extends CommentRepository {

    @Query(value = "Select * from comment a where a.homestay_id=:idHomestay ORDER BY a.last_modified_date DESC", nativeQuery = true)
    Page<Comment> getComment(String idHomestay,Pageable pageable);

    @Query(value = """
            delete from comment
            where homestay_id=:#{#request.id_Owner}
            and id=:#{#request.id_Comment}
            """, nativeQuery = true)
    Comment deleteComment(HomestayOwnerDeleteCommentRequest request);

}
