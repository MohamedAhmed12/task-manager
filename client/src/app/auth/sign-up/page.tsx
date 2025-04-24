"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useSignUp } from "../hooks/useSignUp";

const signupSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),
  name: z.string().nonempty("Name is required"),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function Register({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: {errors},
    clearErrors,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const {mutateAsync, isPending} = useSignUp({
    onSuccess: (data) => {
      router.replace(`/auth/login`);
    },
    onError: (error: Error) => {
      const errMsg: string =
        error?.response?.data?.message || "Something went wrong!";
      // we are using sonner instead of toast as it is deprecated in shadcn
      toast.error(errMsg);
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    await mutateAsync(data);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>

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
              onChange={() => clearErrors("email")}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="grid">
            <Input
              id="name"
              type="text"
              {...register("name")}
              placeholder="Name"
              onChange={() => clearErrors("name")}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="grid">
            <Input
              id="password"
              type="password"
              {...register("password")}
              placeholder="password"
              onChange={() => clearErrors("password")}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-400 hover:bg-blue-400 cursor-pointer mt-3"
          >
            {isPending && <Icons.loaderCircle className="animate-spin" />}
            Sign Up
          </Button>
        </div>
        <div className="text-center text-xs ">
          Already have an account?
          <Link href="/auth/login">
            <span className="underline underline-offset-4 px-1">Sign In.</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
