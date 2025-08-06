package com.example.board.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.board.dto.PostDto;
import com.example.board.repository.PostRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
public class PostController {
    private final PostRepository postRepository;

    @GetMapping("/list")
    public List<PostDto> findAll() {
        return postRepository.findAll()
                .stream()
                .map(PostDto::from)
                .toList();
    }
}
