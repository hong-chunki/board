package com.example.board.utils;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.example.board.classes.ResponseData;
import com.example.board.classes.ResponseData.Head;

@Component
public class ResponseDataUtility {
	
    public Head setHead( String result_code, String result_msg ) {
		Head head = new Head();
		
		head.setResult_code( result_code );
		head.setResult_msg( result_msg );
		
		return head;
    }
    
    public ResponseData setResponseData( Head head, Object body ) {
		ResponseData response_data = new ResponseData();
		
		response_data.setHead( head );
		response_data.setBody( convertObjToMap( body ) );
		
		return response_data;
    }
        
    public ResponseData setResponseDataWithHashMapBody( Head head, HashMap<String, Object> body ) {
    	ResponseData result_data = new ResponseData();
    	
    	result_data.setHead( head );
    	result_data.setBody( body );
    	
    	return result_data;
    }
    
    public ResponseData setResponseDataWithEmptyBody( Head head ) {
		ResponseData response_data = new ResponseData();
		
		Map<String, Object> body= new HashMap<>();
		
		response_data.setHead( head );
		response_data.setBody( body );
		
		return response_data;
    }
    
    public Map<String, Object> convertObjToMap(Object obj ) {
		Map<String, Object> result_map = new HashMap<>();
		
		try {
		    Field[] fields = obj.getClass().getDeclaredFields();
		    
		    for ( int i = 0; i < fields.length; i++ ) {
				fields[i].setAccessible(true);
				result_map.put( fields[i].getName(), fields[i].get(obj) );
		    }
		    
		    return result_map;
		} catch (IllegalArgumentException e) {
		    // TODO Auto-generated catch block
		    e.printStackTrace();
		} catch (IllegalAccessException e) {
		    // TODO Auto-generated catch block
		    e.printStackTrace();
		}
		
		return null;
    }
}
