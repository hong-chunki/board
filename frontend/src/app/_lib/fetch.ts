export async function post<T>(url: string, data: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`POST ${url} 실패: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export async function get<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`GET ${url} 실패: ${res.status}`);
  return res.json() as Promise<T>;
}