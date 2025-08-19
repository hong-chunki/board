package com.example.board.service;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.board.classes.LoginInfoData;
import com.example.board.classes.ResponseData;
import com.example.board.classes.ResponseData.Head;
import com.example.board.constant.ResultCode;
import com.example.board.constant.ResultMsg;
import com.example.board.domain.User;
import com.example.board.dto.UserRegister;
import com.example.board.repository.UserRepository;
import com.example.board.utils.ResponseDataUtility;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

	@Autowired
	private ResponseDataUtility responseUtils;
	
    public ResponseData register(UserRegister dto) {
		ResponseData 	responseData 	= new ResponseData();
		Head			head			= new Head();
		
        if (userRepository.existsByLoginId(dto.id())) {
    		head.setResult_code( ResultCode.USER_ID_ALREADY_EXISTS );
    		head.setResult_msg( ResultMsg.USER_ID_ALREADY_EXISTS );
        	responseData.setHead( head );
        } else {
            User user = new User();
            user.setLoginId(dto.id());
            user.setPassword(passwordEncoder.encode(dto.password()));
            user.setNickname(dto.nickname());

            userRepository.save(user);

    		head.setResult_code( ResultCode.SUCCESS );
    		head.setResult_msg( ResultMsg.SUCCESS );
        }

		responseData = responseUtils.setResponseDataWithEmptyBody(head);
        return responseData;
    }
    
    public ResponseData login(UserRegister dto, HttpServletRequest request) {
		ResponseData 	responseData 	= new ResponseData();
		Head			head			= new Head();
		LoginInfoData 	login_info 		= new LoginInfoData();
		HttpSession 	session 		= request.getSession();

		HashMap<String, Object> body = new HashMap<>();
		
        if (!userRepository.existsByLoginId(dto.id())) {

    		head.setResult_code( ResultCode.USER_ID_NOT_EXISTS );
    		head.setResult_msg( ResultMsg.USER_ID_NOT_EXISTS );
        	responseData.setHead( head );
        } else {
            User user = userRepository.findByLoginId(dto.id());
            
            if( passwordEncoder.matches( dto.password(), user.getPassword() ) ) {
            	body.put( "id"			, user.getLoginId() );
            	body.put( "nickname"	, user.getNickname() );
            	
        		head.setResult_code( ResultCode.SUCCESS );
        		head.setResult_msg( ResultMsg.SUCCESS );

        		login_info.setLoginInfoData( user );
        		
				session.setAttribute( "loginInfo", login_info );
            } else {
        		head.setResult_code( ResultCode.USER_PASSWORD_NOT_MATCHED );
        		head.setResult_msg( ResultMsg.USER_PASSWORD_NOT_MATCHED );
            }
        }

		responseData = responseUtils.setResponseDataWithHashMapBody(head, body);
        return responseData;
    }
}