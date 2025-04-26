package com.isuzumahub.backend.controller;

import com.isuzumahub.backend.model.Post;
import com.isuzumahub.backend.model.User;
import com.isuzumahub.backend.payload.response.MessageResponse;
import com.isuzumahub.backend.security.UserDetailsImpl;
import com.isuzumahub.backend.service.PostService;
import com.isuzumahub.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class PostController {
    
    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<?> getAllPosts() {
        List<Post> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPostById(@PathVariable Long id) {
        Post post = postService.getPostById(id);
        return ResponseEntity.ok(post);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getPostsByAuthorId(@PathVariable Long userId) {
        List<Post> posts = postService.getPostsByAuthorId(userId);
        return ResponseEntity.ok(posts);
    }

    @PostMapping
    public ResponseEntity<?> createPost(@Valid @RequestBody Post post) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User currentUser = userService.getUserById(userDetails.getId());
        
        Post createdPost = postService.createPost(post, currentUser);
        return ResponseEntity.ok(createdPost);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePost(@PathVariable Long id, @Valid @RequestBody Post postDetails) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User currentUser = userService.getUserById(userDetails.getId());
        
        Post updatedPost = postService.updatePost(id, postDetails, currentUser);
        return ResponseEntity.ok(updatedPost);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User currentUser = userService.getUserById(userDetails.getId());
        
        postService.deletePost(id, currentUser);
        return ResponseEntity.ok(new MessageResponse("Post deleted successfully!"));
    }
}