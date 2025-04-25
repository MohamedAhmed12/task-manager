import { NewTask } from "./components/new-task";
import { TaskTable } from "./components/task-table";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-end px-5">
      <NewTask />
      <TaskTable />
    </div>
  );
}
