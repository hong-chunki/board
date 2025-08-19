package com.example.board.dto;

import com.example.board.domain.Category;

public record CategoryDto(
    Long id,
    String name,
    Integer orderNo
) {
    public static CategoryDto from(Category category) {
        return new CategoryDto(
    		category.getId(),
    		category.getName(),
    		category.getOrderNo()
        );
    }
}