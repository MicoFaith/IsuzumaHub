package com.isuzumahub.controller;

import com.isuzumahub.entity.Test;
import com.isuzumahub.entity.TestResult;
import com.isuzumahub.repository.TestRepository;
import com.isuzumahub.repository.TestResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
public class TestController {

    @Autowired
    private TestRepository testRepository;

    @Autowired
    private TestResultRepository testResultRepository;

    @PostMapping("/admin/tests")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createTest(@RequestBody Test test) {
        Test savedTest = testRepository.save(test);
        return ResponseEntity.ok(savedTest);
    }

    @PutMapping("/admin/tests/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateTest(@PathVariable Long id, @RequestBody Test test) {
        Test existingTest = testRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Test not found"));

        existingTest.setName(test.getName());
        existingTest.setDescription(test.getDescription());
        existingTest.setPrice(test.getPrice());
        existingTest.setCategory(test.getCategory());
        existingTest.setActive(test.isActive());

        Test updatedTest = testRepository.save(existingTest);
        return ResponseEntity.ok(updatedTest);
    }

    @DeleteMapping("/admin/tests/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteTest(@PathVariable Long id) {
        testRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/tests")
    public ResponseEntity<?> getAllTests() {
        List<Test> tests = testRepository.findAll();
        return ResponseEntity.ok(tests);
    }

    @GetMapping("/tests/active")
    public ResponseEntity<?> getActiveTests() {
        List<Test> tests = testRepository.findByActive(true);
        return ResponseEntity.ok(tests);
    }

    @GetMapping("/tests/category/{category}")
    public ResponseEntity<?> getTestsByCategory(@PathVariable String category) {
        List<Test> tests = testRepository.findByCategory(category);
        return ResponseEntity.ok(tests);
    }

    @PostMapping("/employee/test-result")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<?> addTestResult(@RequestBody TestResult testResult) {
        TestResult savedTestResult = testResultRepository.save(testResult);
        return ResponseEntity.ok(savedTestResult);
    }

    @GetMapping("/test-details")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<?> getTestDetails() {
        List<Test> tests = testRepository.findByActive(true);
        return ResponseEntity.ok(tests);
    }
} 
 