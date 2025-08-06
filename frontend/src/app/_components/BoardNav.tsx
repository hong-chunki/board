'use client';
import { useState } from "react";
import styled, { css } from 'styled-components';

const BoardNavBlock = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background: #585e91;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;
const BoardNavBtn = styled.div`
  color: white;
  padding: 5px 10px;
  font-size: 20px;

  &:hover {
    background : #4f428f;
  }
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
          <BoardNavBtn key={board.id}>{board.name}</BoardNavBtn>
        ))}
      </BoardNavBlock>
    )
};


export default BoardNav;