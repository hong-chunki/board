'use client';
import { useState } from "react";
import styled, { css } from 'styled-components';

const UserInfoBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 2rem;
  width: 100%;
  background: #adadb1ff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  height: 35px;
  align-items: center;
`;
const LoginBtn = styled.button`
  padding-right: 2rem;
  width: padding : 5px;
  background: #d0d0d5;
  height : 25px;
  padding: 0px 10px;
  line-height: 25px; 
  border-radius: 5px;
`;
const InputBox = styled.input`
  margin-right: 1rem;
  background : white;
  width : 90px;
`;
const UserInfo = () => {
    const [ user, setUser ] = useState( null );
    
    return(
        <UserInfoBlock>
            <InputBox />
            <InputBox />
            <LoginBtn>로그인</LoginBtn>
        </UserInfoBlock>
    )
};


export default UserInfo;