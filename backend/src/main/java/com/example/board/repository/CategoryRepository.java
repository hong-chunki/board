package com.example.board.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.board.domain.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
