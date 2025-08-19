package com.example.board.controller;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.board.dto.CategoryDto;
import com.example.board.repository.CategoryRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/common")
public class CommonController {
	
	 private final CategoryRepository categoryRepository;
	 
	 @GetMapping("/categories")
	 public List<CategoryDto> findAll() {
	    return categoryRepository.findAll(Sort.by(Sort.Direction.ASC, "orderNo"))
	            .stream()
	            .map(CategoryDto::from)
	            .toList();
	 }
}
