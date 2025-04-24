"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const signupSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function Register({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const {
    register,
    handleSubmit,
    formState: {errors},
    clearErrors,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: SignupFormData) => {
    console.log(data);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col"
        {...props}
      >
        <div className="flex flex-col justify-center items-center font-noto-sans">
          <div className="mb-6 text-[40px] text-deep-blue-gray font-bold leading-[1.1] pb-3">
            <span>Join </span>
            <span className="relative">
              <span className="relative inline-block z-[1]">Us</span>
              <div className="absolute inset-0 top-[0.85em] bottom-[0.15em] left-[-3%] right-[-3%] bg-sky-300"></div>
            </span>
          </div>
          <div className="mb-6 text-lg text-center">
            Over 10,000 artists, creators, business owners, and more use our
            services to manage their tasks.
          </div>
        </div>
        <div className="grid gap-3">
          <div className="grid">
            <Input
              id="email"
              type="text"
              {...register("email")}
              placeholder="Email"
              onChange={() => clearErrors("email")} // Clear error when the user is typing in the email field
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="grid">
            <Input
              id="password"
              type="password"
              {...register("password")}
              placeholder="password"
              onChange={() => clearErrors("password")}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-400 hover:bg-blue-400 cursor-pointer mt-3"
          >
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
}
