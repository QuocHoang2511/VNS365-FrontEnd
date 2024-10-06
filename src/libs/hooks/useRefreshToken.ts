import { IUserToken } from "@/libs/types/user";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import { API_URL } from "../utils/constants";

export const useRefreshToken = () => {
  const { data: session, update } = useSession();

  const refreshToken = async () => {
    const res = await handleRefreshToken(session?.user.refreshToken as string);

    if (session) {
      session.user.accessToken = res.accessToken;
      // update({ ...session });
    } else signIn();
  };
  return refreshToken;
};

const handleRefreshToken = async (refreshToken: string) => {
  try {
    const res = await axios.get<IUserToken>(`${API_URL}/auth/refresh`, {
      headers: {
        Authorization: "Bearer " + refreshToken,
      },
    });

    return res.data;
  } catch (error: any) {
    console.log("error", error);

    await signOut({ redirect: false });
    localStorage.removeItem("isLogin");
    location.replace("/login");

    throw Error("refetching token failed.");
  }
};
