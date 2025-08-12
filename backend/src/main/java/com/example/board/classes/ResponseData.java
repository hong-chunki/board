package com.example.board.classes;

import java.util.HashMap;
import java.util.Map;

import com.example.board.constant.ResultCode;
import com.example.board.constant.ResultMsg;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Data;

@Data
public class ResponseData {
    
    private Head				head;
    private Map<String, Object> body;
    
    public ResponseData() {
    	this.head = new Head();
    	this.body = new HashMap<>();
    }
    
    @Data
    public static class Head {
		private String result_code;
		private String result_msg;
    }
    
    public void setSuccessHead() {
    	this.head.setResult_code( ResultCode.SUCCESS );
    	this.head.setResult_msg( ResultMsg.SUCCESS );
    }
    
    public void setHead( String result_code, String result_msg ) {
    	this.head.setResult_code( result_code );
    	this.head.setResult_msg ( result_msg );
    }
    
    public void addBody( String key, Object value ) {
    	body.put( key, value );
    }
    
    public void addObjToBody( Object obj ) throws IllegalArgumentException, IllegalAccessException {
    	ObjectMapper objMapper = new ObjectMapper();
    	body.putAll( objMapper.convertValue( obj, HashMap.class ) );
    }
}
