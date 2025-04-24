import { useQuery } from "@tanstack/react-query";
import axios from "../../../../lib/axios";

const getUser = async (): Promise<T> => {
  return await axios.get("/user");
};

export const getAuthUser = () => {
  return useQuery({
    queryKey: ["getUser"],
    queryFn: getUser,
    staleTime: Infinity,
  });
};
