"use client";

import { useAuth } from "@/context/AuthContext";
import { useSession } from "@/lib/auth-client";

export function useCurrentUser() {
  const { user: expressUser, isLoading: expressLoading } = useAuth();
  const { data: baSession, isPending: baLoading } = useSession();

  const user = expressUser || (baSession?.user ? {
    name: baSession.user.name || "User",
    email: baSession.user.email,
  } : null);

  return { user, isLoading: expressLoading || baLoading };
}