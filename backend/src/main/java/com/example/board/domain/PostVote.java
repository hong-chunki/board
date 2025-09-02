package com.example.board.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "post_votes") // 실제 테이블 이름 명시
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostVote extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id") // 외래키 컬럼
    private Post post;
    
    @Column(name = "vote_type")
    @Enumerated(EnumType.STRING)
    private VoteType voteType;
 
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id") // 외래키 컬럼
    private User user;
}