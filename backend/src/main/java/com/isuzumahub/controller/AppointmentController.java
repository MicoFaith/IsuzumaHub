package com.isuzumahub.controller;

import com.isuzumahub.entity.Appointment;
import com.isuzumahub.entity.User;
import com.isuzumahub.repository.AppointmentRepository;
import com.isuzumahub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/book-appointment")
    public ResponseEntity<?> bookAppointment(@RequestBody Appointment appointment) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User patient = userRepository.findByEmail(auth.getName())
            .orElseThrow(() -> new RuntimeException("User not found"));

        appointment.setPatient(patient);
        appointment.setStatus(Appointment.AppointmentStatus.NEW);

        Appointment savedAppointment = appointmentRepository.save(appointment);
        return ResponseEntity.ok(savedAppointment);
    }

    @GetMapping("/appointments")
    public ResponseEntity<?> getMyAppointments() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User patient = userRepository.findByEmail(auth.getName())
            .orElseThrow(() -> new RuntimeException("User not found"));

        List<Appointment> appointments = appointmentRepository.findByPatient(patient);
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/admin/appointments/{status}")
    public ResponseEntity<?> getAppointmentsByStatus(@PathVariable String status) {
        List<Appointment> appointments = appointmentRepository.findByStatus(
            Appointment.AppointmentStatus.valueOf(status.toUpperCase())
        );
        return ResponseEntity.ok(appointments);
    }

    @PutMapping("/admin/appointments/{id}/status")
    public ResponseEntity<?> updateAppointmentStatus(
        @PathVariable Long id,
        @RequestBody String status
    ) {
        Appointment appointment = appointmentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Appointment not found"));

        appointment.setStatus(Appointment.AppointmentStatus.valueOf(status.toUpperCase()));
        Appointment updatedAppointment = appointmentRepository.save(appointment);
        return ResponseEntity.ok(updatedAppointment);
    }

    @GetMapping("/employee/appointments/{status}")
    public ResponseEntity<?> getEmployeeAppointments(@PathVariable String status) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User employee = userRepository.findByEmail(auth.getName())
            .orElseThrow(() -> new RuntimeException("Employee not found"));

        List<Appointment> appointments = appointmentRepository.findByEmployeeAndStatus(
            employee,
            Appointment.AppointmentStatus.valueOf(status.toUpperCase())
        );
        return ResponseEntity.ok(appointments);
    }

    @PutMapping("/employee/appointments/{id}/collect")
    public ResponseEntity<?> markAppointmentCollected(@PathVariable Long id) {
        Appointment appointment = appointmentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Appointment not found"));

        appointment.setStatus(Appointment.AppointmentStatus.COLLECTED);
        Appointment updatedAppointment = appointmentRepository.save(appointment);
        return ResponseEntity.ok(updatedAppointment);
    }
} 