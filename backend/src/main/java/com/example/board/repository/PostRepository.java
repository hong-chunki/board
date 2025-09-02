package com.example.board.repository;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.board.domain.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
	List<Post> findByBoardId(Long board_id);
	
	@Modifying(clearAutomatically = true)
    @Query("update Post p set p.view = p.view + 1 where p.id = :id")
    int incrementView(@Param("id") Long id);
}
