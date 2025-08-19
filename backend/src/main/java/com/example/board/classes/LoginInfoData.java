package com.example.board.classes;

import com.example.board.domain.User;

import lombok.Data;

@Data
public class LoginInfoData {
	private String 	sessionId;
	private Long	id;
	private String  loginId;
	private String	nickname;
	
	public void setLoginInfoData( User user ) {
		this.id			= user.getId();
		this.loginId 	= user.getLoginId();
		this.nickname 	= user.getNickname();
	}
}
