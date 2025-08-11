import Image from "next/image";
import PostList from "./_components/PostList";
import './globals.css';
import { getPosts } from "./_lib/api";
import { Post } from "./_types/post";

export default async function Home() {
  const posts: Post[] = await getPosts();

  return (

    <PostList posts={posts}></PostList>
  );
}
