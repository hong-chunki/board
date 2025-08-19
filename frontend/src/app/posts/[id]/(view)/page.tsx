import PostList from "@/app/_components/PostList";

type Props = { params: { id: string } };

export default async function PostPage( { params }: Props ) {
  const { id } = await params;    

  return (
    <PostList boardId={Number(id)}></PostList>
  );
}
