package com.example.board.controller;

import com.example.board.domain.Board;
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

    public BoardController(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }
    
    @GetMapping("/list")
    public List<Board> findAll() {
        return boardRepository.findAll(Sort.by(Sort.Direction.ASC, "orderNo"));
    }
}