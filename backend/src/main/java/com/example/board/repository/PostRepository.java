package com.example.board.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.board.domain.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
	List<Post> findByBoardId(Long board_id);
	
}
