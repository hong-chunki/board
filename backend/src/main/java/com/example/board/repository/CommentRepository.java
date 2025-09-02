package com.example.board.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.board.domain.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
	List<Comment> findByPostIdAndIsDeleteFalseOrderByRegDateAsc(Long postId);
}
