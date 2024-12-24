package com.group24.cors.customer.repository;

import com.group24.entities.ImgComment;
import com.group24.repositories.ImgCommentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerImgCommentRepository extends ImgCommentRepository {

    Page<ImgComment> findByCommentId(Pageable pageable, String commentId);

}
