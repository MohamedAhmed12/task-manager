import axios from "../../../../lib/axios";
import {TaskFormData} from "../components/new-task";
import {useMutation, UseMutationOptions} from "@tanstack/react-query";

export interface TaskResponse {
  message: string;
}

export type TasksProps = Omit<
  UseMutationOptions<TaskResponse, Error, TaskFormData, unknown>,
  "muationKey" | "mutationFn"
>;

const create = async (data: TaskFormData): Promise<T> => {
  return await axios.post("/tasks", data);
};

export const createTask = ({...options}: TasksProps) => {
  return useMutation({
    mutationKey: ["createTask"],
    mutationFn: create,
    ...options,
  });
};
