'use client';
import { useState } from "react";

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
      <div className="flex justify-center w-full shadow-[0_2px_4px_rgba(0,0,0,0.08)] flex-col">
        {posts.map((post) => (
          <div key={post.id} className="flex w-full border-b border-gray-400 p-2">
            <img alt="" className="w-[100px] h-auto object-cover" />
            <div className="flex flex-col ml-4 w-[calc(100%-100px)]">
              <div className="text-2xl font-semibold">{post.title}</div>
                <div className="text-xs text-gray-600">테스트</div>
                <div className="text-xs text-gray-600">
                  {post.reg_date.toLocaleString('ko-KR')}
                </div>            
              </div>
            </div>
        ))}
      </div>
    )
};


export default PostList;