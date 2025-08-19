import WriteButton from "./WriteButton";

type Props = {
  children: React.ReactNode;
  params: Promise<{ id: string, board_name : string }>;
};

export default async function Layout({ children, params }: Props) {
  const { id, board_name } = await params;
  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">{board_name}</h1>
      </div>
      {children}
      <div className ="flex mt-2 justify-end">
        <WriteButton boardId={id} />
      </div>
    </div>
  );
}