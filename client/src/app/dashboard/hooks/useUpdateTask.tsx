import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "../../../../lib/axios";
import { Task } from "../components/task-columns";
import { TaskFormData } from "../components/task-dialog";

export interface TaskData {
  taskId: number;
  data: TaskFormData;
}

export type TasksProps = Omit<
  UseMutationOptions<Task, Error, TaskData, unknown>,
  "mutationKey" | "mutationFn"
>;

const updateTaskInCache = (
  queryClient: ReturnType<typeof useQueryClient>,
  updatedTask: Task
) => {
  queryClient.setQueryData(["fetchTasks"], (oldData) => {
    if (!oldData) return {data: []};

    const updatedData = oldData.data.map((task: Task) =>
      task.id === updatedTask.id ? {...task, ...updatedTask} : task
    );

    return {...oldData, data: updatedData};
  });
};

const update = async ({taskId, data}: TaskData): Promise<Task> => {
  const response = await axios.put(`/tasks/${taskId}`, data);
  return response.data;
};

export const useUpdateTask = ({onSuccess, ...options}: TasksProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateTask"],
    mutationFn: update,
    onSuccess: (data, variables, context) => {
      if (onSuccess) {
        onSuccess(data, variables, context);
      }
      if (data) {
        updateTaskInCache(queryClient, data);
      }
    },
    ...options,
  });
};
