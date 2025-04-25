import axios from "../../../../lib/axios";
import { useMutation } from "@tanstack/react-query";

const removeTask = async (taskId: number): Promise<T> => {
  return await axios.delete(`/tasks/${taskId}`);
};

export const deleteTask = () => {
  return useMutation({
    mutationKey: ["deleteTask"],
    mutationFn: removeTask,
  });
};
