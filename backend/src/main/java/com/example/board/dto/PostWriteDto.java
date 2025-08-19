package com.example.board.dto;

public record PostWriteDto(
	Long boardId,
	Long categoryId,
	String title,
	String content
) {
	
}
