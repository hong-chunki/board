//package com.example.board.interceptor;
//
//import org.apache.ibatis.session.SqlSession;
//import org.apache.logging.log4j.LogManager;
//import org.apache.logging.log4j.Logger;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.servlet.ModelAndView;
//import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
//import org.springframework.web.util.WebUtils;
//
//import com.example.board.classes.LoginInfoData;
//
//import jakarta.servlet.http.Cookie;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import jakarta.servlet.http.HttpSession;
// 
//public class AuthenticationInterceptor extends HandlerInterceptorAdapter{
//
//	@Autowired
//	private SqlSession sqlsession;
//	
//	private Logger log = LogManager.getLogger( this.getClass() );
//	
//	
//    // preHandle() : 컨트롤러보다 먼저 수행되는 메서드
//    @Override
//    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//        HttpSession session 	= request.getSession();
//
//        Object obj = session.getAttribute( SessionConstant.LOGININFO );
//        //세션체크 및 쿠키 체크
//        if ( obj == null ) {
//            Cookie loginCookie = WebUtils.getCookie(request, "loginCookie");
//            
//            if ( loginCookie != null ) {
//                String 			cookieValue 	= loginCookie.getValue();
//                MemberDTO 		userVO 			= service.checkMemberWithSessionKey(cookieValue);
//                
//                if ( userVO != null ) {
//                	log.info("make session by cookie,  member_no : {}",userVO.getMember_no() );
//                	LoginInfoData 	login_info 	= new LoginInfoData();
//                	
//                	if ( userVO.getSchool_code() != null ) {
//                		userVO.setSchool_auth( commonUtils.getSchoolAuth( userVO.getSchool_code() ) );
//                    	userVO.setSchool_code( aesUtils.encrypt( userVO.getSchool_code() ) );	
//                	}
//                	
//                	login_info.setMemberLoginInfoData( userVO );
//                	login_info.setSessionId( session.getId() );
//                	
//                    session.setAttribute( SessionConstant.LOGININFO , login_info);
//                    
//                    //add log4j userid start 
//                    if ( login_info.getIs_tester() != null && login_info.getIs_tester().equals("C") ) {
//                    	log4jPrefix = Log4jConstant.STUDENT_TESTER;	
//                    } else {
//                    	log4jPrefix = Log4jConstant.STUDENT_USER;
//                    }
//                    log4jUserId = Integer.toString(login_info.getNo());
//                    //add log4j userid end
//                    
//                    deviceUtil.updateUserDeviceInfo( MemberConstant.LOGIN_TYPE_MEMBER, userVO, request, null );
//                    
//                    service.updateRefreshDate( MemberConstant.LOGIN_TYPE_MEMBER, userVO.getMember_no(), loginCookie, response );
//
//					deviceUtil.insertLoginHistory( request, userVO.getMember_no(), Common.STEMAPP_STUDENT_PREFIX, userVO.getLast_login_method() );
//                }
//            }
//        } else {
//        	//add log4j userid start
//        	if ( obj instanceof LoginInfoData ) {
//	        	LoginInfoData 	login_info 	= (LoginInfoData) obj;
//	            if ( login_info.getIs_tester() != null && login_info.getIs_tester().equals("C") ) {
//	            	log4jPrefix = Log4jConstant.STUDENT_TESTER;	
//	            } else {
//	            	log4jPrefix = Log4jConstant.STUDENT_USER;
//	            }
//	            log4jUserId = Integer.toString(login_info.getNo());
//        	}
//            //add log4j userid end
//        }
//
//		return true;
//        
//    }
// 
//    @Override
//    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
//        super.postHandle(request, response, handler, modelAndView);
//    }
//     
//}
