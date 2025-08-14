import PostList from "./_components/PostList";
import './globals.css';
import { getPosts } from "./_lib/api";
import { Post } from "./_types/post";

export default async function Home() {
  return (

    <PostList boardId={0}></PostList>
  );
}
