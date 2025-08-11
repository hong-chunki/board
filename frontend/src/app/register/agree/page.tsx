'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AgreePage() {
  const [agree, setAgree] = useState({
    terms: false,
    privacy: false,
    age: false,
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setAgree(prev => ({
      ...prev,
      [name]: checked,
    }));
  };

  const goRegister = () => {
    if( agree.terms && agree.privacy && agree.age ) {
      router.replace("/register/form");
    } else {
      alert( "약관에 동의가 필요합니다." );
    } 
  };

  useEffect(() => {
    const load = () => {
      const saved = sessionStorage.getItem('agree');
      if (saved) {
        const save = JSON.parse(saved);
        setAgree( prev => ({
          terms : save.terms,
          privacy : save.privacy,
          age : save.age
        }))
      }
    };
    load(); 
    const onShow = (e: PageTransitionEvent) => { if (e.persisted) load(); };
    window.addEventListener('pageshow', onShow);
    return () => window.removeEventListener('pageshow', onShow);
  }, []);

  useEffect(() => {
    sessionStorage.setItem('agree', JSON.stringify(agree));
  }, [agree]);
  return (
    <div className="block w-[800px] h-full p-4 m-auto">
      <div className="block text-gray-400 mb-4 text-xl font-semibold">이용약관</div>
      <div className="block w-[800px] h-[300px] bg-[#f7f7f7] p-4 overflow-y-auto">
        <strong className="font-bold">이용약관</strong>
        <p className="mt-2 font-semibold">제 1조</p>
        <p>테스트용입니다 테스트용입니다 테스트용입니다 테스트용입니다</p>
        <p>테스트용입니다 테스트용입니다 테스트용입니다 테스트용입니다</p>

        <p className="mt-2 font-semibold">제 2조</p>
        <p>테스트용입니다 테스트용입니다 테스트용입니다 테스트용입니다</p>
        <p>테스트용입니다 테스트용입니다 테스트용입니다 테스트용입니다</p>

        <p className="mt-2 font-semibold">제 3조</p>
        <p>테스트용입니다 테스트용입니다 테스트용입니다 테스트용입니다</p>
        <p>테스트용입니다 테스트용입니다 테스트용입니다 테스트용입니다</p>

        <p className="mt-2 font-semibold">제 4조</p>
        <p>테스트용입니다 테스트용입니다 테스트용입니다 테스트용입니다</p>
        <p>테스트용입니다 테스트용입니다 테스트용입니다 테스트용입니다</p>

        <p className="mt-2 font-semibold">제 5조</p>
        <p>테스트용입니다 테스트용입니다 테스트용입니다 테스트용입니다</p>
        <p>테스트용입니다 테스트용입니다 테스트용입니다 테스트용입니다</p>
      </div>
      <div className="flex items-center mt-1">
        <input type="checkbox" name="terms" 
          checked={agree.terms}
          onChange={handleChange}/>
        <span className="text-l text-blue-600 ml-1">[필수]</span>
        <span className="ml-1">이용약관에 동의 합니다</span>
      </div>
      <div className="block text-gray-400 mb-4 text-xl font-semibold mt-3">개인정보 수집 이용 동의</div>
      <div className="block w-[800px] h-[300px] bg-[#f7f7f7] p-4 overflow-y-auto">
        <strong className="font-bold">개인정보 처리 방침</strong>
        <p className="mt-2 font-semibold">제 1조</p>
        <p>테스트용입니다 테스트용입니다 테스트용입니다 테스트용입니다</p>
        <p>테스트용입니다 테스트용입니다 테스트용입니다 테스트용입니다</p>

        <p className="mt-2 font-semibold">제 2조</p>
        <p>테스트용입니다 테스트용입니다 테스트용입니다 테스트용입니다</p>
        <p>테스트용입니다 테스트용입니다 테스트용입니다 테스트용입니다</p>

        <p className="mt-2 font-semibold">제 3조</p>
        <p>테스트용입니다 테스트용입니다 테스트용입니다 테스트용입니다</p>
        <p>테스트용입니다 테스트용입니다 테스트용입니다 테스트용입니다</p>

        <p className="mt-2 font-semibold">제 4조</p>
        <p>테스트용입니다 테스트용입니다 테스트용입니다 테스트용입니다</p>
        <p>테스트용입니다 테스트용입니다 테스트용입니다 테스트용입니다</p>

        <p className="mt-2 font-semibold">제 5조</p>
        <p>테스트용입니다 테스트용입니다 테스트용입니다 테스트용입니다</p>
        <p>테스트용입니다 테스트용입니다 테스트용입니다 테스트용입니다</p>
      </div>
      <div className="flex items-center mt-1">
        <input type="checkbox" name="privacy"
          checked={agree.privacy}
          onChange={handleChange}/>
        <span className="text-l text-blue-600 ml-1">[필수]</span>
        <span className="ml-1">개인정보처리방침에 동의 합니다.</span>
      </div>
      <div className="flex items-center mt-1">
        <input type="checkbox" name="age"
          checked={agree.age}
          onChange={handleChange}/>
        <span className="text-l text-blue-600 ml-1">[필수]</span>
        <span className="ml-1">14세 이상 본인입니다.</span>
      </div>
      <button className="w-[200px] h-[50px] bg-[#ebebeb] mb-5 m-auto mt-3 text-center text-xl l leading-[2.5] block hover:cursor-pointer hover:bg-[#dedede]"
        onClick={goRegister}
      >다음
      </button>
    </div>
  );
}