package com.example.board.dto;

public record UserRegister(
	String id,
	String password,
	String nickname,
	Boolean auto
) {
	
}
