package com.example.board.dto;

public record CommentDto(
	Long postId,
	String content,
	String userName
) {
	
}
