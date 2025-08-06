package com.example.board.dto;

import com.example.board.domain.Board;

public record BoardDto(
    Long id,
    String name,
    Integer orderNo
) {
    public static BoardDto from(Board board) {
        return new BoardDto(
            board.getId(),
            board.getName(),
            board.getOrderNo()
        );
    }
}