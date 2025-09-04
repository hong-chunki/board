package com.example.board.repository;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.board.domain.Comment;

import jakarta.transaction.Transactional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
	List<Comment> findByPostIdAndIsDeleteOrderByRegDateAsc(Long postId, String isDelete);
	boolean existsByIdAndUserId(Long id, Long userId);
	
	@Modifying
    @Transactional
    @Query("update Comment c set c.isDelete = 'y' where c.id = :id")
    int deleteComment(@Param("id") Long id);
	
	@Modifying
    @Transactional
    @Query("update Comment c set c.content = :content where c.id = :id")
    int updateComment(@Param("id") Long id, @Param("content") String content);
}
