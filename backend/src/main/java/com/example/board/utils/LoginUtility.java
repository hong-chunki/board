package com.example.board.utils;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

import com.example.board.repository.UserRepository;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;


@Component
public class LoginUtility {
	@Autowired
	private AES256Utility aesUtils;
	
	@Autowired
    private UserRepository userRepository;
    
	private String getAESString( int num ) {
		try {
			return aesUtils.encrypt( Integer.toString(num) + Long.toString( System.currentTimeMillis() ) );
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public void setCookie( HttpSession session, HttpServletResponse httpResponse , int num, HttpServletRequest request ) {
		int cookie_date = 30;
		
        String cookieKey 	= getAESString( num ); 
        
        if (cookieKey == null) {
			System.out.println("cookie setting error");
		} else {
			Cookie cookie = new Cookie("loginCookie", cookieKey );
	        cookie.setPath("/");
	        int amount = 60 * 60 * 24 * cookie_date;	        
	        cookie.setMaxAge(amount);
	        
	        httpResponse.addCookie(cookie);
	        Date date = new Date( System.currentTimeMillis() + ( (long) 1000 * amount) );
	        
	        LocalDateTime sessionLimit = date.toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDateTime();
	        userRepository.updateSessionKey( Long.valueOf( num ), cookieKey, sessionLimit );
		}
	}
	
	public void removeCookie( HttpServletRequest request, HttpServletResponse httpResponse , int num  ) {
		Cookie loginCookie = WebUtils.getCookie(request, "loginCookie");
		
        if ( loginCookie != null ){
        	String sessionkey = loginCookie.getValue();
            loginCookie.setPath("/");
            loginCookie.setMaxAge(0);
            httpResponse.addCookie(loginCookie);

            userRepository.removeSessionKey(sessionkey);
        }
	}
}
