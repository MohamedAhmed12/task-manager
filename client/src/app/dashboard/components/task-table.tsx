"use client";

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
import { useQueryClient } from "@tanstack/react-query";
import {
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";
import { deleteTask } from "../actions/deleteTask";
import { TaskStatus } from "../actions/fetchTasks";
import { columns, Task } from "./task-columns";
import { UpdateTask } from "./update-task";

export function TaskTable({
  tasks,
  filteredStatus,
  isLoading,
  isFetched,
}: {
  tasks: Task[];
  filteredStatus: TaskStatus;
  isLoading: boolean;
  isFetched: boolean;
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const queryClient = useQueryClient();

  const {
    mutateAsync,
    isSuccess: deleteTaskIsSuccess,
    isPending: deleteTaskIsPending,
    variables: deleteTaskVariables,
  } = deleteTask();

  const table = useReactTable({
    data: tasks,
    columns,
    state: {sorting},
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleDelete = async (taskId: number) => {
    const res = await mutateAsync(taskId);
    if (res.status || deleteTaskIsSuccess) {
      toast.success("Task deleted successfully!");
      queryClient.invalidateQueries({queryKey: ["fetchTasks"]});
    }
  };

  return (
    <div className="flex flex-col overflow-x-auto w-full rounded-md border">
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
                    <span>{header?.column?.columnDef?.header}</span>
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
                <UpdateTask
                  originalTask={tasks[parseInt(row.id) as number]}
                  filteredStatus={filteredStatus}
                />

                {deleteTaskIsPending &&
                deleteTaskVariables == row.original.id ? (
                  <Icons.loaderCircle
                    size={15}
                    color="#0f4763"
                    className="animate-spin"
                  />
                ) : (
                  <Icons.trash
                    size={15}
                    color="red"
                    className="cursor-pointer"
                    onClick={() => handleDelete(row.original.id)}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {isLoading && (
        <div className="flex flex-col gap-2 flex-1 items-center justify-center w-full h-full min-h-[300px]">
          <Icons.loaderCircle color="#0f4763" className="animate-spin" />
          <span>Loading Data...</span>
        </div>
      )}

      {isFetched && !tasks?.length && (
        <div className="flex flex-col gap-2 flex-1 items-center justify-center w-full h-full min-h-[300px]">
          No data available
        </div>
      )}
    </div>
  );
}
