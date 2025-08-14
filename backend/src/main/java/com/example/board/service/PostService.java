package com.example.board.service;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.board.classes.ResponseData;
import com.example.board.classes.ResponseData.Head;
import com.example.board.dto.PostSummaryDto;
import com.example.board.repository.PostMapper;
import com.example.board.utils.ResponseDataUtility;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostService {

	@Autowired
    private SqlSession sqlSession;

	@Autowired
	private ResponseDataUtility responseUtils;
	
	public ResponseData getPostList( Long boardId, int offset, int size, String sort ) {
		ResponseData 	responseData 	= new ResponseData();
		Head			head			= new Head();

		HashMap<String, Object> body = new HashMap<>();
    	PostMapper postMapper = sqlSession.getMapper( PostMapper.class );
    	
    	System.out.println( "boardId : " + boardId );
    	System.out.println( "offset : " + offset );
    	System.out.println( "size : " + size );
    	List<PostSummaryDto> post_list = postMapper.getPostList(boardId, null,offset, size );
    	
    	System.out.println( post_list );
    	int total = postMapper.getPostListCount(boardId, null);
    	
    	body.put( "rows", post_list );
    	body.put( "total", total );
    	System.out.println( total );
    	
		responseData = responseUtils.setResponseDataWithHashMapBody(head, body);
        return responseData;
	}
}
