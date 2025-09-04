'use client'
import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DOMPurify from 'isomorphic-dompurify';
import { votePost, voteComment, writeComment, getPost, deleteComment, updateComment } from '@/app/_lib/api';
import { ThumbsUp, ThumbsDown, Edit, Trash2, X } from "lucide-react";

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
  const [edit, setEdit]         = useState(0);

  const [editCotent, setEditContent]   = useState('');
  
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

  const vote = async ( target : string, type : string, comment_id ? : number ) => {
    let res;
    if( target == "post" ) {
      res = await votePost({
        id : Number(id),
        type : type
      });
    } else {
      res = await voteComment({
        id : Number(comment_id),
        type : type
      });
    }
    
    if( res.head.result_code == '200' ) {
      const refresh = await getPost(Number(id));
      setInfo(refresh);
    } else if( res.head.result_code != '200' ) {
      alert( res.head.result_msg );
    }
  }

  const delComment = async ( comment_id : number ) => {
    const res = await deleteComment({
      id : Number(comment_id)
    });
    
    if( res.head.result_code == '200' ) {
      const refresh = await getPost(Number(id));
      setInfo(refresh);
    } else if( res.head.result_code != '200' ) {
      alert( res.head.result_msg );
    }
  }

  const editComment = async ( comment_id : number ) => {
    const res = await updateComment({
      id : Number(comment_id),
      content : editCotent
    });
    
    if( res.head.result_code == '200' ) {
      const refresh = await getPost(Number(id));
      setInfo(refresh);
      setEdit(0);
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
        <div className="border rounded border-[#0070f3] px-3 text-[#0070f3] hover:cursor-pointer" onClick={() => vote('post', 'up')}>추천</div>
        <div className="mx-2 px-2 border rounded border-[#dedede] text-[#0070f3]">{info?.vote}</div>
        <div className="border rounded border-[#ff2958] px-3 text-[#ff2958] hover:cursor-pointer" onClick={() => vote('post', 'down')}>비추천</div>
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
            <div className="flex items-center">
              <ThumbsUp className="w-4 h-4" onClick={() => vote('comment', 'up', comment.id)}/>
              <span className="text-[15px]/[15px] h-[15px] ml-1">
                {
                  comment.up == 0 ? "" : comment.up
                }
              </span>
              <ThumbsDown className="w-4 h-4 ml-1" onClick={() => vote('comment', 'down', comment.id)}/>
              <span className="text-[15px]/[15px] h-[15px] ml-1 mr-1">
                {
                  comment.down == 0 ? "" : comment.down
                }
              </span>
              {
                comment.isMine ? 
                <div className="flex items-center">
                  <Edit className="w-4 h-4 mr-1" /><span className="text-[14px] mr-1 hover:underline hover:cursor-pointer" onClick={()=>{setEdit(comment.id); setEditContent(comment.content)}}>수정</span>
                  <Trash2 className="w-4 h-4 mr-1" /><span className="text-[14px] hover:underline hover:cursor-pointer" onClick={()=>delComment(comment.id)}>삭제</span>
                </div> : ""
              }
            </div>
          </div>
          <div className="text-[#666666]">{comment.content}</div>
          {
            comment.id == edit ?
            <div className="border-t border-[#dedede] p-3 mt-1">
              <div className="flex justify-between">
                <div>댓글 수정</div>
                <div className="flex items-center">
                  <X className="w-4 h-4 text-gray-500 stroke-[4]" />
                  <div onClick={()=>setEdit(0)} className="text-[13px]/[13px] hover:underline hover:cursor-pointer">닫기</div>
                </div>
              </div>
              <div className="flex items-top">
                  <textarea className="bg-white border rounded border-[#dedede] min-h-[60px] w-[calc(100%-80px)] px-2" value={editCotent} onChange={(e)=>setEditContent(e.target.value)}></textarea>
                  <button className="bg-[#e7e7e7] border rounded border-[#dedede] h-[50px] w-[60px] ml-2 hover:cursor-pointer" onClick={()=>editComment(comment.id)}>등록</button>
              </div>
            </div>
            : ""
          }
        </div>        
      ))}
      <div className="bg-[#f4f4f4] border rounded border-[#dedede] p-3">
        <div>댓글 쓰기</div>
        <div className="flex items-top">
            <textarea className="bg-white border rounded border-[#dedede] min-h-[60px] w-[calc(100%-80px)] px-2" value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
            <button className="bg-[#e7e7e7] border rounded border-[#dedede] h-[50px] w-[60px] ml-2 hover:cursor-pointer" onClick={submit}>등록</button>
        </div>
      </div>
    </div>
  );
}