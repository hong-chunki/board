package com.example.board.domain;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 45, name = "login_id")
    private String loginId;

    @Column(length = 255)
    private String password;
    
    @Column(length = 255)
    private String email;
    
    @Column(length = 1)
    private String gender;

    @Column(length = 45)
    private String nickname;
    
    private Integer point;

    @Column(length = 255, name ="session_key")
    private String sessionKey;
    
    @Column(name = "session_limit")
    private LocalDateTime sessionLimit;
    
}