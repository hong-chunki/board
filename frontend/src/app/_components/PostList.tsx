'use client';
import { useState } from "react";
import { Post } from "../_types/post";

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
                  {new Date(post.reg_date).toLocaleString('ko-KR')}
                </div>            
              </div>
            </div>
        ))}
      </div>
    )
};


export default PostList;