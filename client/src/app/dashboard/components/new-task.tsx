"use client";

import {createTask} from "../actions/createTask";
import TaskDialog, {TaskFormData} from "./task-dialog";
import {useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {toast} from "sonner";

export function NewTask() {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const {mutateAsync, isPending} = createTask({
    onSuccess: async () => {
      toast.success("Task created successfully!");
      setIsOpen(false);
      // re-invoke react query cach so the new task reflected on the table
      queryClient.invalidateQueries({
        queryKey: ["fetchTasks"],
      });
    },
    onError: (error: Error) => {
      const errMsg: string =
        error?.response?.data?.message || "Something went wrong!";
      toast.error(errMsg);
    },
  });

  const onSubmit = async (data: TaskFormData) => await mutateAsync(data);

  return (
    <TaskDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isPending={isPending}
      onSubmit={onSubmit}
      actionType="create"
    />
  );
}
