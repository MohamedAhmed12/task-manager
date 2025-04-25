"use client";

import {TaskStatus} from "../actions/fetchTasks";
import {useUpdateTask} from "../hooks/useUpdateTask";
import {Task} from "./task-columns";
import TaskDialog, {TaskFormData} from "./task-dialog";
import {useState} from "react";
import {toast} from "sonner";

export function UpdateTask({
  originalTask,
  filteredStatus,
}: {
  originalTask: Task;
  filteredStatus: TaskStatus;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState(originalTask);

  const {mutateAsync, isPending} = useUpdateTask({
    filteredStatus,
    onSuccess: async (data) => {
      toast.success("Task updated successfully!");
      setIsOpen(false);

      if (data) {
        setTask(data);
      }
    },
    onError: (error: Error) => {
      const errMsg: string =
        error?.response?.data?.message || "Something went wrong!";
      toast.error(errMsg);
    },
  });

  const onSubmit = async (data: TaskFormData) => {
    await mutateAsync({taskId: task.id, data});
  };

  return (
    <TaskDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isPending={isPending}
      onSubmit={onSubmit}
      task={task}
      actionType="update"
    />
  );
}
