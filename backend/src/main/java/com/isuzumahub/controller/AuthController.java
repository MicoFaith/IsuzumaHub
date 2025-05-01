package com.isuzumahub.controller;

import com.isuzumahub.dto.JwtResponseDTO;
import com.isuzumahub.dto.LoginRequestDTO;
import com.isuzumahub.dto.SignupRequestDTO;
import com.isuzumahub.dto.UserDTO;
import com.isuzumahub.entity.User;
import com.isuzumahub.entity.Role;
import com.isuzumahub.mapper.UserMapper;
import com.isuzumahub.repository.UserRepository;
import com.isuzumahub.repository.RoleRepository;
import com.isuzumahub.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private UserMapper userMapper;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequestDTO signupRequest) {
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Email is already taken!");
        }

        User user = new User();
        String[] nameParts = signupRequest.getName().split(" ", 2);
        user.setFirstName(nameParts[0]);
        user.setLastName(nameParts.length > 1 ? nameParts[1] : "");
        user.setEmail(signupRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        user.setPhoneNumber(signupRequest.getPhoneNumber());
        user.setEnabled(true);
        user.setAccountNonLocked(true);
        user.setAccountNonExpired(true);
        user.setCredentialsNonExpired(true);

        Role patientRole = roleRepository.findByName("ROLE_PATIENT")
            .orElseThrow(() -> new RuntimeException("Patient role not found"));
        user.addRole(patientRole);

        User savedUser = userRepository.save(user);
        UserDTO userDTO = userMapper.toDTO(savedUser);

        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                signupRequest.getEmail(),
                signupRequest.getPassword()
            )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JwtResponseDTO(jwt, userDTO));
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequestDTO loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(),
                loginRequest.getPassword()
            )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        User user = userRepository.findByEmail(loginRequest.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));
        UserDTO userDTO = userMapper.toDTO(user);

        return ResponseEntity.ok(new JwtResponseDTO(jwt, userDTO));
    }

    @PostMapping("/admin/login")
    public ResponseEntity<?> authenticateAdmin(@RequestBody LoginRequestDTO loginRequest) {
        User user = userRepository.findByEmailAndRoles_Name(loginRequest.getEmail(), "ROLE_ADMIN")
            .orElseThrow(() -> new RuntimeException("Admin not found"));

        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(),
                loginRequest.getPassword()
            )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);
        UserDTO userDTO = userMapper.toDTO(user);

        return ResponseEntity.ok(new JwtResponseDTO(jwt, userDTO));
    }

    @PostMapping("/employee/login")
    public ResponseEntity<?> authenticateEmployee(@RequestBody LoginRequestDTO loginRequest) {
        User user = userRepository.findByEmailAndRoles_Name(loginRequest.getEmail(), "ROLE_EMPLOYEE")
            .orElseThrow(() -> new RuntimeException("Employee not found"));

        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(),
                loginRequest.getPassword()
            )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);
        UserDTO userDTO = userMapper.toDTO(user);

        return ResponseEntity.ok(new JwtResponseDTO(jwt, userDTO));
    }
} 