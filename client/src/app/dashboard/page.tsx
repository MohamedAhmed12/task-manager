"use client";

import { useState } from "react";
import { fetchTasks, TaskStatus } from "./actions/fetchTasks";
import { NewTask } from "./components/new-task";
import { StatusDropdown } from "./components/status-dropdown";
import { TaskTable } from "./components/task-table";

export default function Dashboard() {
  const [filteredStatus, setFilteredStatus] = useState<TaskStatus>(
    TaskStatus.All
  );

  const {data, isLoading, isFetched} = fetchTasks(filteredStatus);

  const handleStatusChange = (status: TaskStatus) => setFilteredStatus(status);

  return (
    <div className="flex flex-col items-end px-5">
      <div className="flex justify-between items-center w-full mb-10">
        <StatusDropdown
          filteredStatus={filteredStatus}
          onChange={handleStatusChange}
        />
        <NewTask />
      </div>
      <TaskTable
        tasks={data?.data || []}
        isLoading={isLoading}
        isFetched={isFetched}
      />
    </div>
  );
}
