package com.isuzumahub.controller;

import com.isuzumahub.entity.Appointment;
import com.isuzumahub.entity.TestResult;
import com.isuzumahub.entity.User;
import com.isuzumahub.repository.AppointmentRepository;
import com.isuzumahub.repository.TestResultRepository;
import com.isuzumahub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
public class ReportController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private TestResultRepository testResultRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/admin/report/sales")
    public ResponseEntity<?> getSalesReport(
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate
    ) {
        List<Appointment> appointments = appointmentRepository.findByStatus(Appointment.AppointmentStatus.COMPLETED);
        double totalSales = appointments.stream()
            .mapToDouble(appointment -> appointment.getTest().getPrice())
            .sum();

        Map<String, Object> report = Map.of(
            "totalSales", totalSales,
            "appointmentCount", appointments.size(),
            "startDate", startDate,
            "endDate", endDate
        );

        return ResponseEntity.ok(report);
    }

    @GetMapping("/admin/report/employee")
    public ResponseEntity<?> getEmployeeReport(
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate
    ) {
        List<User> employees = userRepository.findAll().stream()
            .filter(u -> u.hasRole("ROLE_EMPLOYEE"))
            .collect(Collectors.toList());

        Map<String, Object> report = Map.of(
            "employeeCount", employees.size(),
            "startDate", startDate,
            "endDate", endDate
        );

        return ResponseEntity.ok(report);
    }

    @GetMapping("/employee/report/sample-collection")
    public ResponseEntity<?> getSampleCollectionReport(
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate
    ) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User employee = userRepository.findByEmail(auth.getName())
            .orElseThrow(() -> new RuntimeException("Employee not found"));

        List<Appointment> appointments = appointmentRepository.findByEmployeeAndStatus(
            employee,
            Appointment.AppointmentStatus.COLLECTED
        );

        Map<String, Object> report = Map.of(
            "collectedSamples", appointments.size(),
            "startDate", startDate,
            "endDate", endDate
        );

        return ResponseEntity.ok(report);
    }

    @GetMapping("/employee/report/performance")
    public ResponseEntity<?> getPerformanceReport(
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate
    ) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User employee = userRepository.findByEmail(auth.getName())
            .orElseThrow(() -> new RuntimeException("Employee not found"));

        List<TestResult> testResults = testResultRepository.findByEmployeeAndResultDateBetween(
            employee,
            startDate,
            endDate
        );

        Map<String, Object> report = Map.of(
            "completedTests", testResults.size(),
            "startDate", startDate,
            "endDate", endDate
        );

        return ResponseEntity.ok(report);
    }
} 