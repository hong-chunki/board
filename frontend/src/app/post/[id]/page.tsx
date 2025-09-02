'use client'
import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getPost } from '@/app/_lib/api';
import DOMPurify from 'isomorphic-dompurify';
import { writeComment } from '@/app/_lib/api';
import { votePost } from '@/app/_lib/api';
import { ThumbsUp, ThumbsDown } from "lucide-react";

type Comment = {
  id : number;
  content : string;
  userName : string;
  isMine : boolean;
  isWriter : boolean;
  up : number;
  down : number;
  reg_date : string;
}
type PostDetail = {
  id: number;
  title: string;
  content: string;
  board_name: string;
  reg_date: string;
  view: number;
  category: string;
  user_name: string;
  vote : number;
  comments :Array<Comment>;
};
export default function PostPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [info, setInfo]         = useState<PostDetail | null>(null);
  const [comment, setComment]   = useState('');
  
  const router = useRouter();

  const safe = useMemo(
    () => DOMPurify.sanitize(info?.content ?? '', { FORBID_TAGS: ['script','style'], FORBID_ATTR: ['onerror','onclick'] }),
    [info?.content]
  );
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getPost(Number(id));
        if (mounted) setInfo(data);
      } catch (e) {
        if (mounted) {
            console.error(e);
            alert('네트워크 오류가 발생했습니다.');
        }
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  const submit = async () => {
    const res = await writeComment({
      postId : Number(id),
      content : comment
    })

    if( res.head.result_code == '200' ) {
      const refresh = await getPost(Number(id));
      setInfo(refresh);
    } else if( res.head.result_code != '200' ) {
      alert( res.head.result_msg );
    }
  };

  const convertDate = ( regdate : string ) => {
    const date  = new Date( regdate );
    const today = new Date();

    return String(date.getFullYear()) + "." + ( date.getMonth() + 1 ) + "." + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
  }

  const convertCommentDate = ( regdate : string ) => {
    const created = new Date(regdate).getTime();
    const now = Date.now();
    const diffSec = Math.floor((now - created) / 1000);

    if( diffSec == 0 ) return '방금 전';
    if (diffSec < 60) return `${diffSec}초 전`;
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}분 전`;
    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `${diffHour}시간 전`;
    const diffDay = Math.floor(diffHour / 24);
    return `${diffDay}일 전`;
  }

  const vote = async ( type : string ) => {
    const res = await votePost({
      id : Number(id),
      type : type
    });
    
    if( res.head.result_code == '200' ) {
      const refresh = await getPost(Number(id));
      setInfo(refresh);
    } else if( res.head.result_code != '200' ) {
      alert( res.head.result_msg );
    }
  }
  return (
    <div className="max-w-3xl mx-auto space-y-4 mt-5 p-3">
      <div className="flex items-center mb-0">
        <div className="text-xl pr-2">{info?.board_name}</div> | <div className="pl-2">{info?.category}</div>
      </div>
      <div className="flex bg-[#f7f7f7] h-[40px] items-center justify-between px-3 border-y border-[#dedede] mb-0">
        <div className="text-[20px] truncate max-w-[600px]">{info?.title}</div>
        <div>{convertDate(info?.reg_date || "")}</div>
      </div>
      <div className="flex h-[40px] items-center justify-between px-3 border-b border-[#dedede] mb-0">
        <div className="">{info?.user_name}</div>
        <div className="flex text-[12px]">
            <div className="pr-1">조회 수 <span>{info?.view}</span></div>
            <div className="pr-1">추천 수 <span>{info?.vote}</span></div>
            <div>댓글 <span>{info?.comments.length}</span></div>
        </div>
      </div>
      <div className="p-3" dangerouslySetInnerHTML={{ __html: safe }} />
      <div className="flex border-b border-[#dedede] justify-center pb-2">
        <div className="border rounded border-[#0070f3] px-3 text-[#0070f3] hover:cursor-pointer" onClick={() => vote('up')}>추천</div>
        <div className="mx-2 px-2 border rounded border-[#dedede] text-[#0070f3]">{info?.vote}</div>
        <div className="border rounded border-[#ff2958] px-3 text-[#ff2958] hover:cursor-pointer" onClick={() => vote('down')}>비추천</div>
      </div>
      <div className="mb-0">댓글 {info?.comments.length}개</div>
      {info?.comments.map((comment) => (
        <div
          key={comment.id}
          className="p-2 border-b border-[#dedede]"
        >
          <div className="flex justify-between">
            <div>
              <span className="font-semibold">{comment.userName}</span>
              <span className="text-[#999999] ml-2">{convertCommentDate(comment.reg_date)}</span>
            </div>
            <div className="flex">
              <ThumbsUp className="w-4 h-4" />
              {
                comment.up == 0 ? comment.up : ""
              }
              <ThumbsDown className="w-4 h-4 ml-1" />
              {
                comment.down == 0 ? comment.down : ""
              }
            </div>
          </div>
          <div className="text-[#666666]">{comment.content}</div>
        </div>        
      ))}
      <div className="bg-[#f4f4f4] border rounded border-[#dedede] p-3">
        <div>댓글 쓰기</div>
        <div className="flex items-top">
            <textarea className="bg-white border border-[#dedede] min-h-[60px] w-[calc(100%-80px)]" value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
            <button className="bg-[#e7e7e7] border rounded border-[#dedede] h-[50px] w-[60px] ml-2 hover:cursor-pointer" onClick={submit}>등록</button>
        </div>
      </div>
    </div>
  );
}