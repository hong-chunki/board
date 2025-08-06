import Image from "next/image";

import { get } from "./_lib/fetch";
import PostList from "./_components/PostList";

type Post = {
  id: number;
  title: string;
  content : Text;
  reg_date: Date;
  view : number;
};

export default async function Home() {
  const posts = await get<Post[]>('http://localhost:8080/api/posts/list');
  
  return (

    <PostList posts={posts}></PostList>
  );
}
