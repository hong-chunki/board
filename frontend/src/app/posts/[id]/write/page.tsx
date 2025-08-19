'use client'
import { useState, useEffect } from 'react';
import RichEditor from './RichEditor';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoriesLoading, setCategories, setCategoriesFailed } from '@/store/commonSlice';
import type { RootState } from '@/store/store';
import { getCategories } from '@/app/_lib/api';
import { useParams } from 'next/navigation';
import { writePost } from '@/app/_lib/api';
import { useRouter } from 'next/navigation';

export default function PostWrite() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(''); 
  const [categoryId, setCategoryId] = useState(1);

  const router = useRouter();
  const dispatch = useDispatch();
  const { status, categories } = useSelector((s: RootState) => s.common);

  const params = useParams<{ id: string }>();
  const id = params.id;

  useEffect(() => {
    if (status === 'idle') {
      (async () => {
        try {
          dispatch(setCategoriesLoading())
          const data = await getCategories()
          dispatch(setCategories(data))
        } catch (e) {
          dispatch(setCategoriesFailed(e instanceof Error ? e.message : 'unknown'))
        }
    })()
  }
  }, [status, dispatch]);

  const submit = async () => {
    const res = await writePost({
      boardId : Number(id),
      categoryId : categoryId,
      title : title,
      content : content
    })

    if( res.head.result_code == '200' ) {
      router.back();
    } else if( res.head.result_code != '200' ) {
      alert( res.head.result_msg );
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4 mt-5 bg-[#f3f3f3] p-3 rounded border border-[#aaaaaa]">
      <div className="flex">
        <select className="border w-50 h-8 mr-1 rounded bg-white"
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
        >
            {
              categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>        
              ))
            }
        </select>
        <input
            className="w-full border rounded px-3 py-2 h-8 bg-white" 
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <RichEditor value="" onChange={setContent} />
      <div className="text-right">
        <button className="px-8 py-2 rounded bg-[#4d81e1] text-white hover:cursor-pointer" onClick={submit}>
            등록
        </button>
      </div>
    </div>
  );
}