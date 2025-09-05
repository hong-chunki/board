package com.example.board.repository;

import java.time.LocalDateTime;

import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.board.domain.User;

import jakarta.transaction.Transactional;

public interface UserRepository extends JpaRepository<User, Long> {
	
	 boolean 	existsByLoginId(String userId);
	 User 		findByLoginId(String id);
	 
	@Query("""
			select u
	        from User u
	        where u.sessionKey = :sessionKey and u.sessionLimit > CURRENT_TIMESTAMP
	    """)
	User getUserBySessionKey(@Param("sessionKey") String sessionKey);
	
	@Modifying
    @Transactional
    @Query("update User u set u.sessionKey = :sessionKey, u.sessionLimit = :sessionLimit where u.id = :id")
    int updateSessionKey(@Param("id") Long id, @Param("sessionKey") String sessionKey, @Param("sessionLimit") LocalDateTime sessionLimit);
	
	@Modifying
    @Transactional
    @Query("update User u set u.sessionKey = null, u.sessionLimit = null where u.sessionKey = :sessionKey")
    int removeSessionKey(@Param("sessionKey") String sessionKey);
}
