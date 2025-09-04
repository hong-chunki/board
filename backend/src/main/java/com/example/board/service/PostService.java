package com.example.board.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.example.board.classes.LoginInfoData;
import com.example.board.classes.ResponseData;
import com.example.board.classes.ResponseData.Head;
import com.example.board.constant.ResultCode;
import com.example.board.constant.ResultMsg;
import com.example.board.domain.Board;
import com.example.board.domain.Category;
import com.example.board.domain.Comment;
import com.example.board.domain.CommentVote;
import com.example.board.domain.Post;
import com.example.board.domain.PostVote;
import com.example.board.domain.User;
import com.example.board.dto.CommentDto;
import com.example.board.dto.PostDto;
import com.example.board.dto.PostSummaryDto;
import com.example.board.dto.PostWriteDto;
import com.example.board.dto.VoteCountDto;
import com.example.board.dto.VoteDto;
import com.example.board.repository.BoardRepository;
import com.example.board.repository.CategoryRepository;
import com.example.board.repository.CommentRepository;
import com.example.board.repository.CommentVoteRepository;
import com.example.board.repository.PostMapper;
import com.example.board.repository.PostRepository;
import com.example.board.repository.PostVoteRepository;
import com.example.board.repository.UserRepository;
import com.example.board.utils.ResponseDataUtility;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
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
    private final CommentRepository 	commentRepository;
    private final PostVoteRepository 	postVoteRepository;
    private final CommentVoteRepository commentVoteRepository;
    
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
			Board boardRef = boardRepository.getReferenceById(dto.boardId()); 
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
	
	@Transactional
	public PostDto getPost( Long postId, HttpServletRequest request ) {
		ResponseData 	responseData 	= new ResponseData();
		Head			head			= new Head();
		HttpSession 	session 		= request.getSession();
		LoginInfoData 	login_info 		= (LoginInfoData) session.getAttribute( "loginInfo" );

		HashMap<String, Object> body = new HashMap<>();

		try {
	    	postRepository.incrementView( postId );
	    	
	    	Post post = postRepository.getById( postId );
	    	
	    	List<Comment> 		list 			= commentRepository.findByPostIdAndIsDeleteOrderByRegDateAsc( postId, "n" );
	    	List<CommentDto> 	comment_list 	= new ArrayList<>();
	    	
	    	Integer vote = postVoteRepository.getVote( postId );
	    	
	    	for( Comment c : list ) {
	    		boolean isMine		= false;
	    		boolean isWriter 	= false;
	
	    		if( c.getUser().getId() == login_info.getId() ) {
	    			isMine = true;
	    		}
	    		if( c.getUser().getId() == post.getUser().getId() ) {
	    			isWriter = true;
	    		}
	    		
	    		VoteCountDto count = commentVoteRepository.getVote( c.getId() );
	    		
	    		CommentDto dto = CommentDto.from( c, isMine, isWriter, count.up(), count.down() );
	    		comment_list.add( dto );
	    	}
	    	PostDto dto = PostDto.from( post, comment_list, vote );
	    	
	        return dto;
		} catch( Exception e ) {
			e.printStackTrace();
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
		}
//    	body.put( "post", dto );
    	return null;
//		responseData = responseUtils.setResponseDataWithHashMapBody(head, body);
	}

	@Transactional
	public ResponseData writeComment(CommentDto dto, HttpServletRequest request) {
		ResponseData 	responseData 	= new ResponseData();
		Head			head			= new Head();
		HttpSession 	session 		= request.getSession();
		LoginInfoData 	login_info 		= (LoginInfoData) session.getAttribute( "loginInfo" );
			
		try {
			Post postRef = postRepository.getReferenceById(dto.postId());
			User userRef = userRepository.getReferenceById(login_info.getId());
			    
			Comment comment = new Comment();

			comment.setPost( postRef );
			comment.setContent( dto.content() );
			comment.setUser( userRef );
			commentRepository.save( comment );

			head.setResult_code( ResultCode.SUCCESS );
			head.setResult_msg( ResultMsg.SUCCESS );
		} catch( Exception e ) {
			head.setResult_code( ResultCode.ERROR );
			head.setResult_msg( ResultMsg.ERROR );
			
			e.printStackTrace();
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
		}
			
		responseData = responseUtils.setResponseDataWithEmptyBody(head);
		return responseData;
	}

	@Transactional
	public ResponseData votePost(VoteDto dto, HttpServletRequest request) {
		ResponseData 	responseData 	= new ResponseData();
		Head			head			= new Head();
		HttpSession 	session 		= request.getSession();
		LoginInfoData 	login_info 		= (LoginInfoData) session.getAttribute( "loginInfo" );
			
		try {
			PostVote post_vote = new PostVote();

			boolean exist = postVoteRepository.existsByPostIdAndUserId(dto.id(), login_info.getId());

			if( exist ) {
				head.setResult_code( ResultCode.VOTE_ALREADY_EXISTS );
				head.setResult_msg( ResultMsg.VOTE_ALREADY_EXISTS ); 
			} else {
				Post postRef = postRepository.getReferenceById(dto.id());
				User userRef = userRepository.getReferenceById(login_info.getId());

				post_vote.setPost(postRef);
				post_vote.setUser(userRef);
				post_vote.setVoteType( dto.type() );

				postVoteRepository.save( post_vote );

				head.setResult_code( ResultCode.SUCCESS );
				head.setResult_msg( ResultMsg.SUCCESS ); 
			}
		} catch( Exception e ) {
			head.setResult_code( ResultCode.ERROR );
			head.setResult_msg( ResultMsg.ERROR );
			
			e.printStackTrace();
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
		}
			
		responseData = responseUtils.setResponseDataWithEmptyBody(head);
		return responseData;
	}

	@Transactional
	public ResponseData voteComment(VoteDto dto, HttpServletRequest request) {
		ResponseData 	responseData 	= new ResponseData();
		Head			head			= new Head();
		HttpSession 	session 		= request.getSession();
		LoginInfoData 	login_info 		= (LoginInfoData) session.getAttribute( "loginInfo" );
			
		try {
			CommentVote comment_vote = new CommentVote();

			boolean exist = commentVoteRepository.existsByCommentIdAndUserId(dto.id(), login_info.getId());

			if( exist ) {
				head.setResult_code( ResultCode.VOTE_ALREADY_EXISTS );
				head.setResult_msg( ResultMsg.VOTE_ALREADY_EXISTS ); 
			} else {
				Comment commentRef 	= commentRepository.getReferenceById(dto.id());
				User 	userRef 	= userRepository.getReferenceById(login_info.getId());

				comment_vote.setComment(commentRef);
				comment_vote.setUser(userRef);
				comment_vote.setVoteType( dto.type() );

				commentVoteRepository.save( comment_vote );

				head.setResult_code( ResultCode.SUCCESS );
				head.setResult_msg( ResultMsg.SUCCESS ); 
			}
		} catch( Exception e ) {
			head.setResult_code( ResultCode.ERROR );
			head.setResult_msg( ResultMsg.ERROR );
			
			e.printStackTrace();
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
		}
			
		responseData = responseUtils.setResponseDataWithEmptyBody(head);
		return responseData;
	}
	
	public ResponseData deleteComment(CommentDto dto, HttpServletRequest request) {
		ResponseData 	responseData 	= new ResponseData();
		Head			head			= new Head();
		HttpSession 	session 		= request.getSession();
		LoginInfoData 	login_info 		= (LoginInfoData) session.getAttribute( "loginInfo" );
			
		try {
			boolean exist = commentRepository.existsByIdAndUserId(dto.id(), login_info.getId());

			if( exist ) {
				commentRepository.deleteComment( dto.id() );

				head.setResult_code( ResultCode.SUCCESS );
				head.setResult_msg( ResultMsg.SUCCESS ); 
			} else {
				head.setResult_code( ResultCode.ERROR );
				head.setResult_msg( ResultMsg.ERROR ); 
			}
		} catch( Exception e ) {
			head.setResult_code( ResultCode.ERROR );
			head.setResult_msg( ResultMsg.ERROR );
			
			e.printStackTrace();
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
		}
			
		responseData = responseUtils.setResponseDataWithEmptyBody(head);
		return responseData;
	}
	
	public ResponseData updateComment(CommentDto dto, HttpServletRequest request) {
		ResponseData 	responseData 	= new ResponseData();
		Head			head			= new Head();
		HttpSession 	session 		= request.getSession();
		LoginInfoData 	login_info 		= (LoginInfoData) session.getAttribute( "loginInfo" );
			
		try {
			boolean exist = commentRepository.existsByIdAndUserId(dto.id(), login_info.getId());

			if( exist ) {
				commentRepository.updateComment( dto.id(), dto.content() );

				head.setResult_code( ResultCode.SUCCESS );
				head.setResult_msg( ResultMsg.SUCCESS ); 
			} else {
				head.setResult_code( ResultCode.ERROR );
				head.setResult_msg( ResultMsg.ERROR ); 
			}
		} catch( Exception e ) {
			head.setResult_code( ResultCode.ERROR );
			head.setResult_msg( ResultMsg.ERROR );
			
			e.printStackTrace();
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
		}
			
		responseData = responseUtils.setResponseDataWithEmptyBody(head);
		return responseData;
	}
}
