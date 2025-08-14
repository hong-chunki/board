package com.example.board.classes;

import java.util.HashMap;
import java.util.Map;

import lombok.Data;

@Data
public class RequestData {
	private Map<String, Object> 	head;
	private Map<String, Object> 	body;
	
	public RequestData() {
		this.head = new HashMap<String, Object>();
		this.body = new HashMap<String, Object>();
	}
}
