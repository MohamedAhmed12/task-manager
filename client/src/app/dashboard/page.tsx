import { NewTaskDialog } from "./components/new-task-dialog";
import { TaskTable } from "./components/task-table";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-end px-5">
      <NewTaskDialog />
      <TaskTable />
    </div>
  );
}
