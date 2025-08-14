'use client';

import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';

export default function WriteButton({ boardId }: { boardId: string }) {
  const { isLoggedIn } = useSelector((s: RootState) => s.user);
  const router = useRouter();

  const onClick = () => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      router.push('/login');
      return;
    }
    router.push(`/posts/${boardId}/write`);
  };

  return (
    <button
      onClick={onClick}
      className="rounded-lg border px-3 py-1.5 hover:bg-gray-50"
    >
      글쓰기
    </button>
  );
}