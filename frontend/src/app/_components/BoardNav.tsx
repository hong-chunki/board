'use client';
import { useState } from "react";
import styled, { css } from 'styled-components';

const BoardNavBlock = styled.div`
  display: flex;
  width: 100%;
  background: #202875ff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

type Board = {
  id: number;
  name: string;
};

type Props = {
  boards: Board[];
};


const BoardNav = ({ boards } : Props ) => {
    return(
        <BoardNavBlock>
      {boards.map((board) => (
        <div key={board.id}>{board.name}</div>
      ))}
    </BoardNavBlock>
    )
};


export default BoardNav;