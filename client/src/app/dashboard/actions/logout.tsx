import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios from "../../../../lib/axios";

export type LogoutProps = Omit<
  UseMutationOptions,
  "mutationKey" | "mutationFn"
>;

const logoutUser = async (): Promise<T> => {  
  return await axios.post("/logout");
};

export const logout = ({...options}: LogoutProps) => {
  return useMutation({
    mutationKey: ["logoutUser"],
    mutationFn: logoutUser,
    ...options,
  });
};
