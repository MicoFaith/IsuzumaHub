package com.isuzumahub.dto;

import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String role;
    private String phoneNumber;
    private boolean active;
} 