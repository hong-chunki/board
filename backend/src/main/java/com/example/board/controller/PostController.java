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
import com.example.board.dto.PostWriteDto;
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
}
