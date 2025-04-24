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

export type UseSignUpProps = Omit<
  UseMutationOptions<RegisterResponse, Error, RegisterData, unknown>,
  "muationKey" | "mutationFn"
>;

const registerUser = async (data: RegisterData): Promise<T> => {
  const response = await axios.post("/register", data);
  return response;
};

export const useSignUp = ({...options}: UseSignUpProps) => {
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: registerUser,
    ...options,
  });
};
