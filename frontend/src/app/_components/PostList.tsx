'use client';
import { useEffect, useState, useMemo } from 'react';
import { useReactTable, getCoreRowModel, ColumnDef, flexRender } from '@tanstack/react-table';
import { Post } from "../_types/post";
import { getPosts } from '../_lib/api';

type Props = {
  boardId: number;
};

type Row = { id: number; title: string; user_name: string; reg_date : string; view : number; votes : number };
type ApiRes = { rows: Row[]; total: number };

const PostList = ({ boardId } : Props ) => {
  const columns = useMemo<ColumnDef<Row>[]>(() => [
    { accessorKey: 'catergoryName', header: '탭' },
    { accessorKey: 'title', header: '제목' },
    { accessorKey: 'userName', header: '작성자' },
    { accessorKey: 'regDate', header: '날짜' },
    { accessorKey: 'view', header: '조회' },
    { accessorKey: 'votes', header: '추천' },
  ], []);

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [rows, setRows] = useState<Row[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const { pageIndex, pageSize } = pagination;
    (async () => {
      const r = await getPosts( { boardId : boardId , page : pageIndex + 1, size : pageSize });
      // const r = await fetch(
      //   `/api/posts?boardId=${boardId}&page=${pageIndex + 1}&size=${pageSize}`
      // );
      const data: ApiRes = r.body; // { rows, total } 형태 권장 (혹은 X-Total-Count 헤더)
      setRows(data.rows);
      setTotal(data.total);
    })();
  }, [boardId, pagination]);

  const table = useReactTable({
    data: rows,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    pageCount: Math.ceil(total / pagination.pageSize),
    manualPagination: true, 
    getCoreRowModel: getCoreRowModel(),
  });
    return(
      <div className="flex justify-center w-full shadow-[0_2px_4px_rgba(0,0,0,0.08)] flex-col">        
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map(hg => (
              <tr key={hg.id}>
                {hg.headers.map(h => (
                  <th
                    key={h.id}
                    className="p-2 border-y border-[#dedede] text-center cursor-pointer select-none"
                    onClick={h.column.getToggleSortingHandler()}
                  >
                    {flexRender(h.column.columnDef.header, h.getContext())}
                    {{
                      asc: ' ▲', desc: ' ▼'
                    }[h.column.getIsSorted() as string] ?? null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(r => (
              <tr key={r.id} className="hover:bg-gray-50">
                {r.getVisibleCells().map(c => (
                  <td key={c.id} className="border-y border-[#dedede] p-2 text-center">
                    {flexRender(c.column.columnDef.cell, c.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="mt-3 flex items-center gap-2">
          <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>이전</button>
          <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>다음</button>
          <span>{table.getState().pagination.pageIndex + 1} / {table.getPageCount()}</span>
        </div>
      </div>
    )
};


export default PostList;