'use client';
import { useRouter } from 'next/navigation';

type Board = {
  id: number;
  name: string;
};

type Props = {
  boards: Board[];
};


const BoardNav = ({ boards } : Props ) => {
  const router = useRouter();

  const moveBoard = ( board_id : string ) => {
    router.push( "/posts/" + board_id );
  }
  return(
    <div className="flex justify-center w-full bg-[#585e91] shadow-[0_2px_4px_rgba(0,0,0,0.08)]">
      {boards.map((board) => (
      <div
        key={board.id}
        className="text-white px-3 py-1.5 text-xl cursor-pointer hover:bg-[#4f428f]"
        onClick={ ()=>moveBoard(String(board.id))}
      >
        {board.name}
      </div>        
    ))}
    </div>
  )
};


export default BoardNav;