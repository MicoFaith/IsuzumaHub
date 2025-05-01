package com.isuzumahub.repository;

import com.isuzumahub.entity.TestResult;
import com.isuzumahub.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TestResultRepository extends JpaRepository<TestResult, Long> {
    List<TestResult> findByAppointment_Patient(User patient);
    List<TestResult> findByEmployee(User employee);
    List<TestResult> findByResultDateBetween(LocalDateTime startDate, LocalDateTime endDate);
    List<TestResult> findByEmployeeAndResultDateBetween(User employee, LocalDateTime startDate, LocalDateTime endDate);
} 