'use client'
import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { getPost } from '@/app/_lib/api';
import DOMPurify from 'isomorphic-dompurify';
import { writeComment } from '@/app/_lib/api';

type PostDetail = {
  id: number;
  title: string;
  content: string;
  board_name: string;
  reg_date: string;
  view: number;
  category: string;
  user_name: string;
};
export default function PostPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [info, setInfo]         = useState<PostDetail | null>(null);
  const [comment, setComment]   = useState('');
  
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
    } else if( res.head.result_code != '200' ) {
      alert( res.head.result_msg );
    }
  };

  const convertDate = ( regdate : string ) => {
    const date  = new Date( regdate );
    const today = new Date();

    return String(date.getFullYear()) + "." + ( date.getMonth() + 1 ) + "." + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
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
            <div className="pr-1">추천 수 <span>{info?.view}</span></div>
            <div>댓글 <span>{info?.view}</span></div>
        </div>
      </div>
      <div className="p-3" dangerouslySetInnerHTML={{ __html: safe }} />
      <div className="flex border-b border-[#dedede] justify-center pb-2">
        <div className="border rounded border-[#0070f3] px-3 text-[#0070f3]">추천</div>
        <div className="mx-2 px-2 border rounded border-[#dedede] text-[#0070f3]">{info?.view}</div>
        <div className="border rounded border-[#ff2958] px-3 text-[#ff2958]">비추천</div>
      </div>
      <div>댓글 {}개</div>
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