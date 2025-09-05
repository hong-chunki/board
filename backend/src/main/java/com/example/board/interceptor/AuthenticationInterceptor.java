package com.example.board.interceptor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.util.WebUtils;

import com.example.board.classes.LoginInfoData;
import com.example.board.domain.User;
import com.example.board.repository.UserRepository;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@Component
public class AuthenticationInterceptor implements HandlerInterceptor{

	@Autowired
    private UserRepository userRepository;
    
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        HttpSession session 	= request.getSession();

        Object obj = session.getAttribute( "loginInfo" );
        
        if ( obj == null ) {
            Cookie loginCookie = WebUtils.getCookie(request, "loginCookie");

            if ( loginCookie != null ) {
                String 	cookieValue 	= loginCookie.getValue();
                User 	userVO 			= userRepository.getUserBySessionKey(cookieValue);

                if ( userVO != null ) {
                	LoginInfoData 	login_info 	= new LoginInfoData();

                	login_info.setLoginInfoData( userVO );
                	
                    session.setAttribute( "loginInfo" , login_info);
                }
            }
        }
		return true;
    }
}
