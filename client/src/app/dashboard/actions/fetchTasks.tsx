import { useQuery } from "@tanstack/react-query";
import axios from "../../../../lib/axios";

export enum TaskStatus {
  All = "all",
  Pending = "pending",
  InProgress = "in-progress",
  Completed = "completed",
}

const listAllTasks = async (status: TaskStatus): Promise<T> => {
  const url =
    status && status != TaskStatus.All ? `/tasks?status=${status}` : "/tasks";

  return await axios.get(url);
};

export const fetchTasks = (status: TaskStatus) => {
  return useQuery({
    queryKey: ["fetchTasks", status],
    queryFn: () => listAllTasks(status),
  });
};
