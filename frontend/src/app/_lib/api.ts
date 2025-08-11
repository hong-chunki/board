const BASE_URL = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080';

export async function getPosts() {
  const res = await fetch(`${BASE_URL}/api/posts/list`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`GET 실패: ${res.status}`);
  return res.json();
}

export async function getBoards() {
  const res = await fetch(`${BASE_URL}/api/boards/list`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`GET 실패: ${res.status}`);
  return res.json();
}

export async function registerUser(data: {
  id: string;
  password: string;
  nickname: string;
}) {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`POST 실패: ${res.status}`);
  return res.json();
}