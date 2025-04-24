"use server";

import {cookies} from "next/headers";

export async function manageAuthCookie(
  action: "set" | "get" | "delete",
  token?: string
) {
  const cookieStore = await cookies();

  switch (action) {
    case "set":
      if (token) {
        cookieStore.set("auth_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
        });
      }
      break;

    case "get":
      return cookieStore.get("auth_token")?.value || null;

    case "delete":
      cookieStore.delete("auth_token");
      break;

    default:
      throw new Error("Invalid action");
  }
}
