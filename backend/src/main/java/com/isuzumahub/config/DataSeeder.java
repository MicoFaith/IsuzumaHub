package com.isuzumahub.config;

import com.isuzumahub.entity.User;
import com.isuzumahub.entity.Role;
import com.isuzumahub.repository.UserRepository;
import com.isuzumahub.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Create roles if they don't exist
        createRoleIfNotExists("ROLE_ADMIN");
        createRoleIfNotExists("ROLE_EMPLOYEE");
        createRoleIfNotExists("ROLE_PATIENT");

        // Create admin user if it doesn't exist
        if (!userRepository.existsByEmail("admin@isuzumahub.com")) {
            User admin = new User();
            admin.setFirstName("Admin");
            admin.setLastName("User");
            admin.setEmail("admin@isuzumahub.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setPhoneNumber("1234567890");
            admin.setEnabled(true);
            admin.setAccountNonLocked(true);
            admin.setAccountNonExpired(true);
            admin.setCredentialsNonExpired(true);

            Role adminRole = roleRepository.findByName("ROLE_ADMIN")
                .orElseThrow(() -> new RuntimeException("Admin role not found"));
            admin.addRole(adminRole);

            userRepository.save(admin);
        }

        // Create employee user if it doesn't exist
        if (!userRepository.existsByEmail("employee@isuzumahub.com")) {
            User employee = new User();
            employee.setFirstName("Employee");
            employee.setLastName("User");
            employee.setEmail("employee@isuzumahub.com");
            employee.setPassword(passwordEncoder.encode("employee123"));
            employee.setPhoneNumber("0987654321");
            employee.setEnabled(true);
            employee.setAccountNonLocked(true);
            employee.setAccountNonExpired(true);
            employee.setCredentialsNonExpired(true);

            Role employeeRole = roleRepository.findByName("ROLE_EMPLOYEE")
                .orElseThrow(() -> new RuntimeException("Employee role not found"));
            employee.addRole(employeeRole);

            userRepository.save(employee);
        }
    }

    private void createRoleIfNotExists(String roleName) {
        if (!roleRepository.existsByName(roleName)) {
            Role role = new Role();
            role.setName(roleName);
            roleRepository.save(role);
        }
    }
} 