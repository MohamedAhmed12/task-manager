"use client";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {zodResolver} from "@hookform/resolvers/zod";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";

const loginSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: {errors},
    clearErrors,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log("data", data);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Sign In</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col"
        {...props}
      >
        <div className="flex flex-col justify-center items-center font-noto-sans">
          <div className="mb-6 text-[40px] text-deep-blue-gray font-bold leading-[1.1] pb-3">
            <span className="pr-2">sign</span>
            <span className="relative">
              <span className="relative inline-block z-[1]">in</span>
              <div className="absolute inset-0 top-[0.85em] bottom-[0.15em] left-[-3%] right-[-3%] bg-amber-200"></div>
            </span>
          </div>
          <div className="mb-6 text-lg">
            Welcome back! Sign in to your account
          </div>
        </div>
        <div className="grid gap-3">
          <div className="grid">
            <Input
              id="email"
              type="email"
              placeholder="Email"
              {...register("email")}
              onChange={() => clearErrors("email")}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="grid">
            <Input
              id="password"
              type="password"
              placeholder="Password"
              {...register("password")}
              onChange={() => clearErrors("password")}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button
            type="submit"
            className="w-full bg-blue-400 hover:bg-blue-400 cursor-pointer mt-3"
          >
            Sign In
          </Button>
        </div>
      </form>
      <div className="text-center text-xs">
        Not yet a member?
        <Link href="/auth/sign-up">
          <span className="underline underline-offset-4 px-1">Sign Up</span>
        </Link>
      </div>
    </div>
  );
};
