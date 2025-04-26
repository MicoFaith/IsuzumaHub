package com.isuzumahub.backend.service;

import com.isuzumahub.backend.model.Comment;
import com.isuzumahub.backend.model.Post;
import com.isuzumahub.backend.model.User;
import com.isuzumahub.backend.repository.CommentRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentService {
    
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    public Comment getCommentById(Long id) {
        return commentRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Comment not found with id: " + id));
    }

    public List<Comment> getCommentsByPostId(Long postId) {
        return commentRepository.findByPostIdOrderByCreatedAtDesc(postId);
    }

    public List<Comment> getCommentsByAuthorId(Long authorId) {
        return commentRepository.findByAuthorId(authorId);
    }

    public Comment createComment(Comment comment, User author, Long postId) {
        Post post = postService.getPostById(postId);
        comment.setAuthor(author);
        comment.setPost(post);
        comment.setCreatedAt(LocalDateTime.now());
        comment.setUpdatedAt(LocalDateTime.now());
        return commentRepository.save(comment);
    }

    public Comment updateComment(Long id, Comment commentDetails, User currentUser) {
        Comment comment = getCommentById(id);
        
        // Check if user is authorized to update the comment
        if (!comment.getAuthor().getId().equals(currentUser.getId()) && 
            !currentUser.hasRole("ADMIN") && 
            !currentUser.hasRole("EMPLOYEE")) {
            throw new AccessDeniedException("You are not authorized to update this comment");
        }

        comment.setContent(commentDetails.getContent());
        comment.setUpdatedAt(LocalDateTime.now());
        return commentRepository.save(comment);
    }

    public void deleteComment(Long id, User currentUser) {
        Comment comment = getCommentById(id);
        
        // Check if user is authorized to delete the comment
        if (!comment.getAuthor().getId().equals(currentUser.getId()) && 
            !currentUser.hasRole("ADMIN") && 
            !currentUser.hasRole("EMPLOYEE")) {
            throw new AccessDeniedException("You are not authorized to delete this comment");
        }

        commentRepository.delete(comment);
    }
} 