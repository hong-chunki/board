package com.example.board.controller;

import com.example.board.domain.Board;
import com.example.board.dto.BoardDto;
import com.example.board.repository.BoardRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/boards")
public class BoardController {

    private final BoardRepository boardRepository;
 
    @GetMapping("/list")
    public List<BoardDto> findAll() {
        return boardRepository.findAll(Sort.by(Sort.Direction.ASC, "orderNo"))
                .stream()
                .map(BoardDto::from)
                .toList();
    }
}