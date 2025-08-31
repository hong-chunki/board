'use client';
import { useEffect, useState, useMemo, useRef } from 'react';
import { useReactTable, getCoreRowModel, ColumnDef, flexRender } from '@tanstack/react-table';
import { Post } from "../_types/post";
import { getPosts } from '../_lib/api';
import { useRouter, usePathname } from 'next/navigation';

type Props = {
  boardId: number;
};

type Row = { id: number; title: string; userName: string; regDate : string; view : number; votes : number };
type ApiRes = { rows: Row[]; total: number };

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    align?: 'left' | 'center' | 'right';
  }
}
const PostList = ({ boardId } : Props ) => {
  const router = useRouter();

  const columns = useMemo<ColumnDef<Row>[]>(() => [
    { accessorKey: 'catergoryName', header: '탭', size : 60 },
    { accessorKey: 'title', header: '제목', size : 400, meta : { align : 'left' } },
    { accessorKey: 'userName', header: '작성자', size : 120 },
    { accessorKey: 'regDate', header: '날짜', size : 140 },
    { accessorKey: 'view', header: '조회', size : 60 },
    { accessorKey: 'votes', header: '추천', size : 60 },
  ], []);

  const [columnSizing, setColumnSizing] = useState({
    catergoryName: 60, title: 400, userName: 120, regDate: 140, view : 60, votes : 60
  });
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [rows, setRows] = useState<Row[]>([]);
  const [total, setTotal] = useState(0);
  const pathname = usePathname();
  const pushingRef = useRef(false);

  useEffect(() => {
    const { pageIndex, pageSize } = pagination;
    (async () => {
      const r = await getPosts( { boardId : boardId , page : pageIndex + 1, size : pageSize });

      const data: ApiRes = r.body;

      data.rows.map( row => ( row.regDate = convertDate(row.regDate) )) ;
      setRows(data.rows);
      setTotal(data.total);
    })();
  }, [boardId, pagination]);

  const convertDate = ( regdate : string ) => {
    const date  = new Date( regdate );
    const today = new Date();

    if( date.getFullYear() == today.getFullYear() && date.getMonth() == today.getMonth() && date.getDate() == today.getDate() ) {
      return date.getHours() + ":" + date.getMinutes();
    } else {
      return String(date.getFullYear()).slice(-2) + "." + ( date.getMonth() + 1 ) + "." + date.getDate();
    }
  }
  const showDetail = (id:number) => {
    router.push(`/post/${id}`);
  }
  const table = useReactTable({
    data: rows,
    columns,
    state: { pagination, columnSizing },
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
                    style={{ width : h.getSize() }}
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
                  <td key={c.id} className="border-y border-[#dedede] p-2 text-center"
                    style={{ width : c.column.getSize(), textAlign: c.column.columnDef.meta?.align, }}
                    onClick={ () => showDetail(r.original.id) }
                    >
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