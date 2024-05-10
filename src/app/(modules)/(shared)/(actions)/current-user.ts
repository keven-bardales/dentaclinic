"use server";

import { auth } from "@/root/auth";

export const getCurrentUserSession = async () => {
  const session = await auth();

  if (!session) {
    return null;
  }

  return session;
};
