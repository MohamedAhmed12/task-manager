"use client";

import { getAuthUser } from "../actions/getAuthUser";
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

export function Header() {
  const {data} = getAuthUser();

  //   username as derived state
  const userName = data?.data?.name;

  return (
    <div className="flex justify-end items-center w-full p-3">
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
          <DropdownMenuItem
            onClick={() => console.log("s")}
            className="cursor-pointer"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
