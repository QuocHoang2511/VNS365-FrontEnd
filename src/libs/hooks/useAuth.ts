import { signIn, signOut } from "next-auth/react";

import { IUserLoginArgs } from "@/libs/types/user";
import { useRouter } from "next/router";

export const useAuth = () => {
  const router = useRouter();

  const login = async (args: IUserLoginArgs) => {
    const res = await signIn("credentials", {
      email: args.email,
      password: args.password,
      redirect: false,
    });

    if (!res?.ok) {
      throw new Error("CredentialsSignin-401");
    }
  };

  const logout = async () => {
    await signOut({ redirect: false });
    // await request.post("auth/logout");

    router.push("/login");
  };

  return {
    login,
    logout,
  };
};
