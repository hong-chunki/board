package com.example.board.dto;

import com.example.board.domain.VoteType;

public record VoteDto(
	Long id,
	VoteType type
) {
	
}
