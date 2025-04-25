import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "../../../../lib/axios";
import { TaskStatus } from "../actions/fetchTasks";
import { Task } from "../components/task-columns";
import { TaskFormData } from "../components/task-dialog";

export interface TaskData {
  taskId: number;
  data: TaskFormData;
}

export type TasksProps = {filteredStatus: TaskStatus} & Omit<
  UseMutationOptions<Task, Error, TaskData, unknown>,
  "mutationKey" | "mutationFn"
>;

const update = async ({taskId, data}: TaskData): Promise<Task> => {
  const response = await axios.put(`/tasks/${taskId}`, data);
  return response.data;
};

export const useUpdateTask = ({
  filteredStatus,
  onSuccess,
  ...options
}: TasksProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateTask"],
    mutationFn: update,
    onSuccess: (data, variables, context) => {
      if (onSuccess) {
        onSuccess(data, variables, context);
      }

      if (data) {
        // invalidate cache regaridn this query to display the change on the table
        queryClient.invalidateQueries({
          queryKey: ["fetchTasks", filteredStatus],
        });
      }
    },
    ...options,
  });
};
