package com.example.board.repository;

import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.board.domain.CommentVote;
import com.example.board.dto.VoteCountDto;

public interface CommentVoteRepository extends JpaRepository<CommentVote, Long> {
	boolean existsByCommentIdAndUserId(Long commentId, Long userId);
	
	@Query("""
			select new com.example.board.dto.VoteCountDto(
		      coalesce(sum(case when v.voteType = 'UP' then 1 else 0 end), 0),
		      coalesce(sum(case when v.voteType = 'DOWN' then 1 else 0 end), 0)
		    )
	        from CommentVote v
	        where v.comment.id = :id
	    """)
	VoteCountDto getVote(@Param("id") Long id);
}
