package com.example.board.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.example.board.domain.Post;

public record PostDto(
    Long id,
    String title,
    String content,
    String board_name,
    LocalDateTime reg_date,
    Integer view,
    String category,
    String user_name,
    List<CommentDto> comments,
    Integer vote
) {
    public static PostDto from(Post post, List<CommentDto> comments, Integer vote ) {
        return new PostDto(
        	post.getId(),
            post.getTitle(),
            post.getContent(),
            post.getBoard().getName(),
            post.getRegDate(),
            post.getView(),
            post.getCategory().getName(),
            post.getUser().getNickname(),
            comments,
            vote
       );
    }
}