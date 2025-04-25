import { useQuery } from "@tanstack/react-query";
import axios from "../../../../lib/axios";

const listAllTasks = async (): Promise<T> => {
  return await axios.get("/tasks");
};

export const fetchTasks = () => {
  return useQuery({
    queryKey: ["fetchTasks"],
    queryFn: listAllTasks,
    staleTime: 150000,
  });
};
