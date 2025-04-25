import { ColumnDef } from "@tanstack/react-table";

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: "pending" | "in-progress" | "completed";
}

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({row}) => row.getValue("title"),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({row}) => row.getValue("description"),
  },
  {
    accessorKey: "due_date",
    header: "Due Date",
    cell: ({row}) => row.getValue("due_date"),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({row}) => row.getValue("status"),
    filterFn: "includes",
  },
];
