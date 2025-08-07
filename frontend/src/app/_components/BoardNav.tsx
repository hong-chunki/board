'use client';
import { useState } from "react";
import styled, { css } from 'styled-components';

type Board = {
  id: number;
  name: string;
};

type Props = {
  boards: Board[];
};


const BoardNav = ({ boards } : Props ) => {
    return(
      <div className="flex justify-center w-full bg-[#585e91] shadow-[0_2px_4px_rgba(0,0,0,0.08)]">
        {boards.map((board) => (
        <div
          key={board.id}
          className="text-white px-3 py-1.5 text-xl cursor-pointer hover:bg-[#4f428f]"
        >
          {board.name}
        </div>        
      ))}
      </div>
    )
};


export default BoardNav;