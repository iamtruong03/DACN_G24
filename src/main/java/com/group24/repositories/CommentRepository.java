package com.group24.repositories;

import com.group24.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository(CommentRepository.NAME)
public interface CommentRepository extends JpaRepository<Comment, String> {
    public static final String NAME = "BaseCommentRepository";
}
