package com.isuzumahub.repository;

import com.isuzumahub.entity.Appointment;
import com.isuzumahub.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByPatient(User patient);
    List<Appointment> findByEmployee(User employee);
    List<Appointment> findByStatus(Appointment.AppointmentStatus status);
    List<Appointment> findByEmployeeAndStatus(User employee, Appointment.AppointmentStatus status);
    List<Appointment> findByAppointmentNumberContainingOrPatient_NameContainingOrPatient_PhoneNumberContaining(
        String appointmentNumber, String name, String phoneNumber);
} 