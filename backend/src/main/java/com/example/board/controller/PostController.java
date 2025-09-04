package com.example.board.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.board.classes.ResponseData;
import com.example.board.dto.CommentDto;
import com.example.board.dto.PostDto;
import com.example.board.dto.PostWriteDto;
import com.example.board.dto.VoteDto;
import com.example.board.repository.PostRepository;
import com.example.board.service.PostService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
public class PostController {
    private final PostRepository postRepository;

	@Autowired
    private final PostService postService;
    @GetMapping("/list")
    public @ResponseBody ResponseData getPostListAll(
    	    @RequestParam(defaultValue = "0") int offset,
    	    @RequestParam(defaultValue = "20") int size,
    	    @RequestParam(defaultValue = "reg_date,DESC") String sort) {
    	return postService.getPostList( null, offset, size, sort );
    }
    
    @GetMapping("/list/{boardId}")
    public @ResponseBody ResponseData getPostList( 
    	    @PathVariable long boardId,
    	    @RequestParam(defaultValue = "0") int offset,
    	    @RequestParam(defaultValue = "20") int size,
    	    @RequestParam(defaultValue = "reg_date,DESC") String sort) {
    	return postService.getPostList( boardId, offset, size, sort );
    } 
    
    @PostMapping("/write")
    public @ResponseBody ResponseData writePost( @RequestBody PostWriteDto dto, HttpServletRequest request) {
    	return postService.writePost( dto, request );
    }
    
    @GetMapping("/{postId}")
    public PostDto getPost( 
    	    @PathVariable long postId, HttpServletRequest request) {
    	return postService.getPost( postId, request );
    } 

    @PostMapping("/writeComment")
    public @ResponseBody ResponseData writeComment( @RequestBody CommentDto dto, HttpServletRequest request) {
    	return postService.writeComment( dto, request );
    }
    
    @PostMapping("/vote")
    public @ResponseBody ResponseData votePost( @RequestBody VoteDto dto, HttpServletRequest request) {
    	return postService.votePost( dto, request );
    }
    
    @PostMapping("/voteComment")
    public @ResponseBody ResponseData voteComment( @RequestBody VoteDto dto, HttpServletRequest request) {
    	return postService.voteComment( dto, request );
    }
    
    @PostMapping("/deleteComment")
    public @ResponseBody ResponseData deleteComment( @RequestBody CommentDto dto, HttpServletRequest request) {
    	return postService.deleteComment( dto, request );
    }
    
    @PostMapping("/updateComment")
    public @ResponseBody ResponseData updateComment( @RequestBody CommentDto dto, HttpServletRequest request) {
    	return postService.updateComment( dto, request );
    }
}
