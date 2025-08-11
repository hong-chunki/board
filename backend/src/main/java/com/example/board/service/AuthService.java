package com.example.board.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.board.domain.User;
import com.example.board.dto.UserDto;
import com.example.board.dto.UserRegister;
import com.example.board.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    
    public void register(UserRegister dto) {
        if (userRepository.existsByLoginId(dto.id())) {
            throw new RuntimeException("이미 존재하는 아이디입니다.");
        }

        User user = new User();
        user.setLoginId(dto.id());
        user.setPassword(passwordEncoder.encode(dto.password()));
        user.setNickname(dto.nickname());

        userRepository.save(user);
    }
}