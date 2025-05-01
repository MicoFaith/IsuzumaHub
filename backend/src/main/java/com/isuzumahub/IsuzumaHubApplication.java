package com.isuzumahub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "com.isuzumahub.entity")
@EnableJpaRepositories(basePackages = "com.isuzumahub.repository")
public class IsuzumaHubApplication {
    public static void main(String[] args) {
        SpringApplication.run(IsuzumaHubApplication.class, args);
    }
} 