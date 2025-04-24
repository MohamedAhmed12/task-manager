import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios from "../../../../lib/axios";

interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export type LoginProps = Omit<
  UseMutationOptions<LoginResponse, Error, LoginData, unknown>,
  "muationKey" | "mutationFn"
>;

const loginUser = async (data: LoginData): Promise<T> => {
  return await axios.post("/login", data);
};

export const login = ({...options}: LoginProps) => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: loginUser,
    ...options,
  });
};
