package com.isuzumahub.controller;

import com.isuzumahub.entity.TestResult;
import com.isuzumahub.entity.User;
import com.isuzumahub.repository.TestResultRepository;
import com.isuzumahub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
public class TestResultController {

    @Autowired
    private TestResultRepository testResultRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/employee/test-result")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<?> addTestResult(@RequestBody TestResult testResult) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User employee = userRepository.findByEmail(auth.getName())
            .orElseThrow(() -> new RuntimeException("Employee not found"));

        testResult.setEmployee(employee);
        testResult.setResultDate(LocalDateTime.now());

        TestResult savedResult = testResultRepository.save(testResult);
        return ResponseEntity.ok(savedResult);
    }

    @GetMapping("/patient/test-results")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<?> getPatientTestResults() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User patient = userRepository.findByEmail(auth.getName())
            .orElseThrow(() -> new RuntimeException("Patient not found"));

        List<TestResult> results = testResultRepository.findByAppointment_Patient(patient);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/employee/test-results")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<?> getEmployeeTestResults() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User employee = userRepository.findByEmail(auth.getName())
            .orElseThrow(() -> new RuntimeException("Employee not found"));

        List<TestResult> results = testResultRepository.findByEmployee(employee);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/admin/test-results")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getTestResultsByDateRange(
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate
    ) {
        List<TestResult> results = testResultRepository.findByResultDateBetween(startDate, endDate);
        return ResponseEntity.ok(results);
    }
} 