package com.isuzumahub.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CommentDTO {
    private Long id;
    
    @NotBlank(message = "Content is required")
    private String content;
    
    private Long postId;
    private Long userId;
    private String userName;
    private LocalDateTime createdAt;
} 