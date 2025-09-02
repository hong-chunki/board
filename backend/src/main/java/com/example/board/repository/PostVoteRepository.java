package com.example.board.repository;

import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.board.domain.PostVote;

public interface PostVoteRepository extends JpaRepository<PostVote, Long> {
	boolean existsByPostIdAndUserId(Long postId, Long userId);
	
	@Query("""
	        select 
	          coalesce(sum(case when v.voteType = 'up' then 1 else 0 end), 0)
	          - coalesce(sum(case when v.voteType = 'down' then 1 else 0 end), 0)
	        from PostVote v
	        where v.post.id = :id
	    """)
    Integer getVote(@Param("id") Long id);
}
