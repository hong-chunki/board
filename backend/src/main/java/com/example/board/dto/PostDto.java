package com.example.board.dto;

import java.time.LocalDateTime;

import com.example.board.domain.Post;

public record PostDto(
    Long id,
    String title,
    String content,
    String board_name,
    LocalDateTime reg_date,
    Integer view,
    String category
) {
    public static PostDto from(Post post) {
        return new PostDto(
        	post.getId(),
            post.getTitle(),
            post.getContent(),
            post.getBoard().getName(),
            post.getRegDate(),
            post.getView(),
            post.getCategory().getName()
       );
    }
}