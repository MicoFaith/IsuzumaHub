package com.isuzumahub.backend.repository;

import com.isuzumahub.backend.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByAuthorId(Long authorId);
    List<Post> findAllByOrderByCreatedAtDesc();
} 