import axios from "../../../../lib/axios";
import {useMutation, UseMutationOptions} from "@tanstack/react-query";

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface RegisterResponse {
  message: string;
}

export type RegisterProps = Omit<
  UseMutationOptions<RegisterResponse, Error, RegisterData, unknown>,
  "muationKey" | "mutationFn"
>;

const registerUser = async (data: RegisterData): Promise<T> => {
  const response = await axios.post("/api/register", data);
  return response;
};

export const signUp = ({...options}: RegisterProps) => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: registerUser,
    ...options,
  });
};
