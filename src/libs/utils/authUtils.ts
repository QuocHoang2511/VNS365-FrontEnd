import { authOptions } from "@/libs/auth/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface SessionUser {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  role?: string | null | undefined;
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const session = await getServerSession(authOptions);

  if (session?.user?.email) {
    return session.user;
  }
  return null;
}

export async function isSignedIn(): Promise<boolean> {
  const user = await getSessionUser();
  return !!user;
}

export async function redirectIfAuthenticated() {
  const session = await isSignedIn();

  if (session) {
    redirect("/");
  }
}

export async function getRole() {
  const user = await getSessionUser();
  return user?.role;
}

export async function getUser() {
  const user = await getSessionUser();
  return user;
}
