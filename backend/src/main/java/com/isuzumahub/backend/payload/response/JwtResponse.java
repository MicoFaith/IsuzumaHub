package com.isuzumahub.backend.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import java.util.Collection;

@Data
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String name;
    private String email;
    private Collection<? extends GrantedAuthority> roles;

    public JwtResponse(String token, Long id, String username, String name, String email, Collection<? extends GrantedAuthority> roles) {
        this.token = token;
        this.id = id;
        this.username = username;
        this.name = name;
        this.email = email;
        this.roles = roles;
    }
} 