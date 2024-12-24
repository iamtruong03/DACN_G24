package com.group24.repositories;

import com.group24.entities.ImgComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository(ImgCommentRepository.NAME)
public interface ImgCommentRepository extends JpaRepository<ImgComment, String> {
    public static final String NAME = "BaseImgCommentRepository";
}
