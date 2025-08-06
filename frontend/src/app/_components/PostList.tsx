'use client';
import { useState } from "react";
import styled, { css } from 'styled-components';

const PostBlock = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;
const PostDiv = styled.div`
  padding : 10px 5px;
  width : 100%;
  border-bottom : 1px solid gray;
`;

const Thumbnail = styled.img`
    width : 100px;
    height : auto;
`;
const Info = styled.div`
    width : calc( 100% - 100px );
    height : auto;
`;
const Title = styled.div`
    font-size : 30px;
`;
const BoardName = styled.div`
    font-size : 10px;
`;
const Date = styled.div`
    font-size : 10px;
`;
type Post = {
  id: number;
  title: string;
  content : Text;
  reg_date: Date;
  view : number;
};

type Props = {
  posts: Post[];
};


const PostList = ({ posts } : Props ) => {
    return(
      <PostBlock>
        {posts.map((post) => (
          <PostDiv key={post.id}>
            <Thumbnail alt=""></Thumbnail>
            <Info>
                <Title>{post.title}</Title>
                <BoardName>테스트</BoardName>
                <Date>{post.reg_date.toLocaleString('ko-KR')}</Date>
            </Info>
            
            </PostDiv>
        ))}
      </PostBlock>
    )
};


export default PostList;