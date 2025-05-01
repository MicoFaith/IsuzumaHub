package com.isuzumahub.mapper;

import com.isuzumahub.dto.UserDTO;
import com.isuzumahub.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    
    public UserDTO toDTO(User user) {
        if (user == null) {
            return null;
        }
        
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setActive(user.isEnabled());
        dto.setRole(user.getRoles().stream()
            .findFirst()
            .map(role -> role.getName())
            .orElse("ROLE_USER"));
        
        return dto;
    }
    
    public User toEntity(UserDTO dto) {
        if (dto == null) {
            return null;
        }
        
        User user = new User();
        user.setId(dto.getId());
        String[] nameParts = dto.getName().split(" ", 2);
        user.setFirstName(nameParts[0]);
        user.setLastName(nameParts.length > 1 ? nameParts[1] : "");
        user.setEmail(dto.getEmail());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setEnabled(dto.isActive());
        
        return user;
    }
} 