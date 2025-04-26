package com.isuzumahub.backend.service;

import com.isuzumahub.backend.model.User;
import com.isuzumahub.backend.repository.UserRepository;
import com.isuzumahub.backend.security.UserDetailsImpl;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService implements UserDetailsService {
    
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        return UserDetailsImpl.build(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new EntityNotFoundException("User not found with email: " + email));
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
            .orElseThrow(() -> new EntityNotFoundException("User not found with username: " + username));
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public User createUser(User user) {
        // Ensure only USER role is assigned during registration
        user.getRoles().clear();
        user.addRole("USER");
        return userRepository.save(user);
    }

    public User updateUser(Long id, User userDetails) {
        User user = getUserById(id);
        user.setName(userDetails.getName());
        user.setEmail(userDetails.getEmail());
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        User user = getUserById(id);
        userRepository.delete(user);
    }

    public void addRole(Long userId, String role) {
        User user = getUserById(userId);
        // Only allow adding ADMIN or EMPLOYEE roles through this method
        if (!role.equals("ADMIN") && !role.equals("EMPLOYEE")) {
            throw new AccessDeniedException("Cannot add role: " + role);
        }
        user.addRole(role);
        userRepository.save(user);
    }

    public void removeRole(Long userId, String role) {
        User user = getUserById(userId);
        // Prevent removing the USER role
        if (role.equals("USER")) {
            throw new AccessDeniedException("Cannot remove USER role");
        }
        user.removeRole(role);
        userRepository.save(user);
    }

    public boolean isAdmin(User user) {
        return user.hasRole("ADMIN");
    }

    public boolean isEmployee(User user) {
        return user.hasRole("EMPLOYEE");
    }

    public boolean isUser(User user) {
        return user.hasRole("USER");
    }
} 