package com.example.board.service;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.board.classes.LoginInfoData;
import com.example.board.classes.ResponseData;
import com.example.board.classes.ResponseData.Head;
import com.example.board.constant.ResultCode;
import com.example.board.constant.ResultMsg;
import com.example.board.domain.Board;
import com.example.board.domain.Category;
import com.example.board.domain.Post;
import com.example.board.domain.User;
import com.example.board.dto.PostSummaryDto;
import com.example.board.dto.PostWriteDto;
import com.example.board.repository.BoardRepository;
import com.example.board.repository.CategoryRepository;
import com.example.board.repository.PostMapper;
import com.example.board.repository.PostRepository;
import com.example.board.repository.UserRepository;
import com.example.board.utils.ResponseDataUtility;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostService {

	@Autowired
    private SqlSession sqlSession;

	@Autowired
	private ResponseDataUtility responseUtils;

    private final PostRepository 		postRepository;
    private final BoardRepository		boardRepository;
    private final CategoryRepository 	categoryRepository;
    private final UserRepository 		userRepository;
    
	public ResponseData getPostList( Long boardId, int offset, int size, String sort ) {
		ResponseData 	responseData 	= new ResponseData();
		Head			head			= new Head();

		HashMap<String, Object> body = new HashMap<>();
    	PostMapper postMapper = sqlSession.getMapper( PostMapper.class );
    	
    	List<PostSummaryDto> post_list = postMapper.getPostList(boardId, null,offset, size );
    	
    	int total = postMapper.getPostListCount(boardId, null);
    	
    	body.put( "rows", post_list );
    	body.put( "total", total );
    	
		responseData = responseUtils.setResponseDataWithHashMapBody(head, body);
        return responseData;
	}
	
	 public ResponseData writePost(PostWriteDto dto, HttpServletRequest request) {
			ResponseData 	responseData 	= new ResponseData();
			Head			head			= new Head();
			HttpSession 	session 		= request.getSession();
			LoginInfoData 	login_info 		= (LoginInfoData) session.getAttribute( "loginInfo" );
			
			HashMap<String, Object> body = new HashMap<>();

			try {
				Board boardRef = boardRepository.getReferenceById(dto.boardId()); // DB select 안함(프록시)
			    Category catRef = categoryRepository.getReferenceById(dto.categoryId());
			    User userRef = userRepository.getReferenceById(login_info.getId());
			    
				Post post = new Post();

				post.setCategory( catRef );
				post.setBoard( boardRef );
				post.setTitle( dto.title() );
				post.setContent( dto.content() );
				post.setUser( userRef );
				postRepository.save( post );

        		head.setResult_code( ResultCode.SUCCESS );
        		head.setResult_msg( ResultMsg.SUCCESS );
			} catch( Exception e ) {

        		head.setResult_code( ResultCode.ERROR );
        		head.setResult_msg( ResultMsg.ERROR );
			}
			
			responseData = responseUtils.setResponseDataWithEmptyBody(head);
	        return responseData;
	    }
}
