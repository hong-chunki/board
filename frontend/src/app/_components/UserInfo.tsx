'use client';
import { useState } from "react";
import Link from 'next/link';

const UserInfo = () => {
    const [ user, setUser ] = useState( null );
    
    return(
        <div className="flex justify-end items-center w-full bg-[#adadb1ff] shadow-[0_2px_4px_rgba(0,0,0,0.08)] h-[35px] pr-8">
          <Link
            href="/register"
            className="block mr-4 text-black no-underline hover:text-[#246ea5] hover:underline"
          >
            회원가입
          </Link>
          <input
            type="text"
            className="mr-4 w-[90px] bg-white p-1"
          />
          <input
            type="text"
            className="mr-4 w-[90px] bg-white p-1"
          />
          <button className="h-[25px] px-4 bg-[#d0d0d5] rounded text-black leading-[25px]">
            로그인
          </button>
        </div>
    )
};


export default UserInfo;