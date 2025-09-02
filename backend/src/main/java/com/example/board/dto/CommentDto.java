package com.example.board.dto;

import java.time.LocalDateTime;

import com.example.board.domain.Comment;

public record CommentDto(
	Long postId,
	String content,
	String userName,
    LocalDateTime reg_date,
	boolean isMine,
	boolean isWriter,
	Long up,
	Long down
	
) {
	public static CommentDto from(Comment comment, boolean isMine, boolean isWriter, Long up, Long down ) {
        return new CommentDto(
        	comment.getId(),
        	comment.getContent(),
        	comment.getUser().getNickname(),
        	comment.getRegDate(),
        	isMine,
        	isWriter,
        	up,
        	down
       );
    }
}
