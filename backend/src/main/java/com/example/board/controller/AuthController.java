package com.example.board.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.board.classes.ResponseData;
import com.example.board.dto.UserRegister;
import com.example.board.repository.UserRepository;
import com.example.board.service.AuthService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService userService;
	private final UserRepository userRepository;
    
    @PostMapping("/register")	
    public @ResponseBody ResponseData register( @RequestBody UserRegister user, HttpServletRequest request) {
    	return userService.register(user);
    }
    
    @PostMapping("/login")	
    public @ResponseBody ResponseData login( @RequestBody UserRegister user, HttpServletRequest request) {
    	return userService.login(user, request);
    }
}
