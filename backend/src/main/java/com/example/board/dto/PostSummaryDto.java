package com.example.board.dto;

import java.time.LocalDateTime;

public record PostSummaryDto(
	    Long id, String title,
	    String userName,
	    String catergoryName,
	    LocalDateTime regDate,
	    int view, int votes
	) {}