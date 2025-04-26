package com.isuzumahub.backend.service;

import com.isuzumahub.backend.model.Post;
import com.isuzumahub.backend.model.User;
import com.isuzumahub.backend.repository.PostRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class PostService {
    
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserService userService;

    public List<Post> getAllPosts() {
        return postRepository.findAllByOrderByCreatedAtDesc();
    }

    public Post getPostById(Long id) {
        return postRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Post not found with id: " + id));
    }

    public List<Post> getPostsByAuthorId(Long authorId) {
        return postRepository.findByAuthorId(authorId);
    }

    public Post createPost(Post post, User author) {
        post.setAuthor(author);
        post.setCreatedAt(LocalDateTime.now());
        post.setUpdatedAt(LocalDateTime.now());
        return postRepository.save(post);
    }

    public Post updatePost(Long id, Post postDetails, User currentUser) {
        Post post = getPostById(id);
        
        // Check if user is authorized to update the post
        if (!post.getAuthor().getId().equals(currentUser.getId()) && 
            !currentUser.hasRole("ADMIN") && 
            !currentUser.hasRole("EMPLOYEE")) {
            throw new AccessDeniedException("You are not authorized to update this post");
        }

        post.setTitle(postDetails.getTitle());
        post.setContent(postDetails.getContent());
        post.setUpdatedAt(LocalDateTime.now());
        return postRepository.save(post);
    }

    public void deletePost(Long id, User currentUser) {
        Post post = getPostById(id);
        
        // Check if user is authorized to delete the post
        if (!post.getAuthor().getId().equals(currentUser.getId()) && 
            !currentUser.hasRole("ADMIN") && 
            !currentUser.hasRole("EMPLOYEE")) {
            throw new AccessDeniedException("You are not authorized to delete this post");
        }

        postRepository.delete(post);
    }
} 