"use client";

import { fetchTasks } from "../actions/fetchTasks";
import { columns } from "./task-columns";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

export function TaskTable() {
  const [sorting, setSorting] = useState<SortingState>([]);

  const {data, isLoading, isFetched} = fetchTasks();

  const table = useReactTable({
    data: data?.data || [],
    columns,
    state: {sorting},
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleDelete = (taskId: number) => {
    console.log(taskId);
  };

  return (
    <div className="flex flex-col overflow-x-auto w-full rounded-md border min-h-[300px]">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  <Button
                    variant="ghost"
                    onClick={() => header.column.toggleSorting()}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <span>{header.column.columnDef.header}</span>
                    {header.column.getIsSorted() ? (
                      header.column.getIsSorted() === "desc" ? (
                        <Icons.arrowDown className="h-4 w-4" />
                      ) : (
                        <Icons.arrowUp className="h-4 w-4" />
                      )
                    ) : (
                      <Icons.chevronsUpDown className="h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
              ))}
              <TableHead />
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="border-b">
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="pl-4.5">
                  {cell.getValue()}
                </TableCell>
              ))}
              <TableCell className="flex gap-2">
                <Icons.pencil
                  size={15}
                  color="black"
                  className="cursor-pointer"
                />
                <Icons.trash
                  size={15}
                  color="red"
                  className="cursor-pointer"
                  onClick={() => handleDelete(row.original.id)} 
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {isLoading && (
        <div className="flex flex-col gap-2 flex-1 items-center justify-center w-full h-full">
          <Icons.loaderCircle color="#0f4763" className="animate-spin" />
          <span>Loading Data...</span>
        </div>
      )}

      {isFetched && !data && (
        <div className="flex flex-col gap-2 flex-1 items-center justify-center w-full h-full">
          No data available
        </div>
      )}
    </div>
  );
}
