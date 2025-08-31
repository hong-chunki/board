const BASE_URL = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080';
export async function getPosts(data: {
  boardId: number;
  page: number;
  size: number;
}) {

  let base_url = `${BASE_URL}/api/posts/list`;
  
  if( data.boardId != 0 ) {
    base_url += "/" + data.boardId;
  }
  const url = base_url + `?page=${data.page + 1}&size=${data.size}`;
  const res = await fetch( url, { cache: 'no-store',
    credentials: 'include', });
  if (!res.ok) throw new Error(`GET 실패: ${res.status}`);

  return res.json();
}

export async function getBoards() {
  const res = await fetch(`${BASE_URL}/api/boards/list`, { cache: 'no-store',
    credentials: 'include', });
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
    credentials: 'include',
  });
  if (!res.ok) throw new Error(`POST 실패: ${res.status}`);
  return res.json();
}

export async function loginAuth(data: {
  id: string;
  password: string;
}) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  });
  if (!res.ok) throw new Error(`POST 실패: ${res.status}`);
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/api/common/categories`, { cache: 'no-store',
    credentials: 'include', });
  if (!res.ok) throw new Error(`GET 실패: ${res.status}`);
  return res.json();
}

export async function writePost(data: {
  boardId : number;
  categoryId: number;
  title: string;
  content: string;
}) {
  const res = await fetch(`${BASE_URL}/api/posts/write`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  });
  if (!res.ok) throw new Error(`POST 실패: ${res.status}`);
  return res.json();
}

export async function getPost(postId : number) {
  const base_url = `${BASE_URL}/api/posts/`;
 
  const url = base_url + postId;

  const res = await fetch( url, { cache: 'no-store',
    credentials: 'include', });
  if (!res.ok) throw new Error(`GET 실패: ${res.status}`);
  return res.json();
}

export async function writeComment(data: {
  postId : number;
  content: string;
}) {
  const res = await fetch(`${BASE_URL}/api/posts/writeComment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  });
  if (!res.ok) throw new Error(`POST 실패: ${res.status}`);
  return res.json();
}
