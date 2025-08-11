'use client';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { registerUser } from "../_lib/api";

const RegisterForm = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const cancle = () => {
    router.replace("/");
  }

  const submit = async () => {
    if(!/^[a-zA-Z0-9]{3,20}$/.test(id.trim())) {
      alert( "아이디를 확인해주세요." );
      return;
    }
    if( password.trim().length == 0 ) {
      alert( "비밀번호를 입력해주세요." );
      return;
    } else if( password.trim().length < 8 ) {
      alert( "비밀번호는 8자 이상입니다." );
      return;
    } else if( password.trim() !== password2.trim() ) {
      alert( "비밀번호를 다시 확인해주세요." );
      return;
    }
    if( nickname.trim().length == 0 || nickname.trim().length > 8 ) {
      alert( "닉네임을 확인해주세요." );
      return;
    }
    
    setLoading(true);

    const data = {
      id: id.trim(), 
      password : password.trim(), 
      nickname: nickname.trim()
    }
    
    try {
      await registerUser(data);
      alert('가입이 완료되었습니다.');
      router.replace('/login'); // 혹은 메인으로
    } catch (e) {
      console.error(e);
      alert('네트워크 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full h-full">
      <div className="p-6 space-y-3 w-[1000px] m-auto">
        <h1 className="text-xl font-semibold">회원가입</h1>
        <div className="flex mb-0 border-t-1 border-b-1 border-[#dedede]">
          <div className="w-[150px] items-center flex bg-[#efefef] pl-3">
            <span>아이디</span>
          </div>
          <div className="items-center pl-5 pt-[20px] pb-[20px]">
            <input
              name="id"
              value={id}
              type="text"
              className="border p-2 block w-60 h-8"
              onChange={(e) => setId(e.target.value)}
            />
            <div className="text-gray-400 text-sm mt-2">
              아이디는 3~20자 사이의 영문, 숫자 조합입니다.
            </div>
          </div>
        </div>
        <div className="flex mb-0 border-b-1 border-[#dedede]">
          <div className="w-[150px] items-center flex bg-[#efefef] pl-3">
            <span>비밀번호</span>
          </div>
          <div className="items-center pl-5 pt-[20px] pb-[20px]">
            <input
              name="password"
              type="password"
              value={password}
              className="border p-2 block w-60 h-8"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="text-gray-400 text-sm mt-2">
              비밀번호는 8자 이상입니다.
            </div>
          </div>
        </div>
        <div className="flex mb-0 border-b-1 border-[#dedede]">
          <div className="w-[150px] items-center flex bg-[#efefef] pl-3">
            <span>비밀번호 확인</span>
          </div>
          <div className="items-center pl-5 pt-[20px] pb-[20px]">
            <input
              name="password2"
              type="password"
              value={password2}
              className="border p-2 block w-60 h-8"
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
        </div>
        <div className="flex mb-0 border-b-1 border-[#dedede]">
          <div className="w-[150px] items-center flex bg-[#efefef] pl-3">
            <span>닉네임</span>
          </div>
          <div className="items-center pl-5 pt-[20px] pb-[20px]">
            <input
              name="nickname"
              type="text"
              value={nickname}
              className="border p-2 block w-60 h-8"
              maxLength={8}
              onChange={(e) => setNickname(e.target.value)}
            />
            <div className="text-gray-400 text-sm mt-2">
              닉네임은 8자 이내입니다.
            </div>
          </div>
        </div>
        <div className="text-right mt-5">
          <button className="px-4 py-2 border rounded h-10 hover:cursor-pointer hover:bg-[#efefef] mr-2 border-gray-300" onClick={submit} 
            disabled={loading}>등록</button>
          <button className="px-4 py-2 border rounded h-10 hover:cursor-pointer hover:bg-[#efefef] border-gray-300" onClick={cancle}>취소</button>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;