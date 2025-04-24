import axios from "../../../../lib/axios";
import {manageAuthCookie} from "@/app/auth/actions/manageAuthCookie";
import {useQuery, UseQueryOptions} from "@tanstack/react-query";

export interface LoginResponse {
  token: string;
}

export type LoginProps = Omit<
  UseQueryOptions<LoginResponse>,
  "queryKey" | "queryFn"
>;

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
