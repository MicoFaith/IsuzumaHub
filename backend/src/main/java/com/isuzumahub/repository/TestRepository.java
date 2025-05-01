package com.isuzumahub.repository;

import com.isuzumahub.entity.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TestRepository extends JpaRepository<Test, Long> {
    List<Test> findByActive(boolean active);
    List<Test> findByCategory(String category);
} 