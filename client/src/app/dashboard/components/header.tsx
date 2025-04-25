"use client";

import { manageAuthCookie } from "@/app/auth/actions/manageAuthCookie";
import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getAuthUser } from "../actions/getAuthUser";
import { logout } from "../actions/logout";

export function Header() {
  const router = useRouter();

  const {data} = getAuthUser();
  const {mutateAsync, isPending} = logout({
    onSuccess: async () => {
      toast.success("Logged out successfully!");
      await manageAuthCookie("delete");

      // Redirect to the home page whcih will redirect to login as he is unauth
      router.push("/");
    },
  });

  const handleLogout = async () => {
    await mutateAsync();
  };

  return (
    data && (
      <div className="flex justify-end items-center w-full">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="w-11 h-11 cursor-pointer">
              <AvatarImage asChild className="w-8 h-8">
                <Icons.user className="w-3 h-3" />
              </AvatarImage>
              <AvatarFallback>
                <Icons.user />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {data?.data?.name || "user"}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {data?.data?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              {isPending && <Icons.loaderCircle className="animate-spin" />}
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  );
}
