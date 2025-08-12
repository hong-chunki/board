'use client';
import { useState } from "react";
import Link from 'next/link';
import { loginAuth } from "../_lib/api";

import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '@/store/userSlice';
import type { RootState } from '@/store/store';

const UserInfo = () => {
    const dispatch = useDispatch();
    const { isLoggedIn, user } = useSelector((s: RootState) => s.user);
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [autoCheck, setAutoCheck] = useState(false);

    const nickname = user ? user.nickname : '';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = e.target;

      setAutoCheck(checked);
    };
    const loginUser = async () => {

      if( id.trim().length == 0 ) {
        alert( "아이디를 입력해주세요." );
        return;
      }
      if( password.trim().length == 0 ) {
        alert( "비밀번호를 입력해주세요." );
        return;
      }

      setLoading(true);
  
      const data = {
        id: id.trim(), 
        password : password.trim(), 
      }
      
      try {
        const res = await loginAuth(data);

        if( res.head.result_code == "200") {
          
          dispatch(login(res.body));
        } else {
          alert( res.head.result_msg );
        }
      } catch (e) {
        console.error(e);
        alert('네트워크 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    }
    
    const doLogout = () => dispatch(logout());

    return(
        <div className="flex justify-end items-center w-full bg-[#adadb1ff] shadow-[0_2px_4px_rgba(0,0,0,0.08)] h-[35px] pr-8">
          { isLoggedIn  ? 
            (
              <>
                <div>{ nickname }님</div>
                <div className="px-2 hover:underline hover:cursor-pointer">내 정보</div><hr className="h-[13px] w-[1px] bg-black"/>
                <div className="px-2 hover:underline hover:cursor-pointer">내 글</div><hr className="h-[13px] w-[1px] bg-black"/>
                <div className="px-2 hover:underline hover:cursor-pointer">내 댓글</div><hr className="h-[13px] w-[1px] bg-black"/>
                <div className="px-2 hover:underline hover:cursor-pointer">쪽지함</div>
                <button className="h-[25px] px-4 bg-[#d0d0d5] rounded text-black leading-[25px] cursor-pointer hover:bg-[#dedede]" disabled={loading} onClick={doLogout} >
                  로그아웃
                </button>
              </>
            ) :
            (
              <>
              <Link
                href="/register/agree"
                className="block mr-4 text-black no-underline hover:text-[#246ea5] hover:underline"
              >
                회원가입
              </Link>
              <input
                type="text"
                className="mr-4 w-[90px] bg-white p-1 h-[25px]"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <input
                type="password"
                value={password}
                className="mr-4 w-[90px] bg-white p-1 h-[25px]"
                onChange={(e) => setPassword(e.target.value)}
              />
              <input type="checkbox" name="auto_login" className="h-[16px] w-[16px]"
                checked={autoCheck}
                onChange={handleChange}
              />
              <span className="mr-2 text-[13px]">자동 로그인</span>
              <button className="h-[25px] px-4 bg-[#d0d0d5] rounded text-black leading-[25px] cursor-pointer hover:bg-[#dedede]" disabled={loading} onClick={loginUser} >
                로그인
              </button>
              </>
            )
          }
        </div>
    )
};


export default UserInfo;