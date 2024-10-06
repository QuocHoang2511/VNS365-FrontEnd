import { request } from "@/libs/request";
import { AxiosHeaders, InternalAxiosRequestConfig } from "axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRefreshToken } from "./useRefreshToken";

const useAxiosAuth = () => {
  const { data: session } = useSession();
  const refreshToken = useRefreshToken();

  useEffect(() => {
    const requestIntercept = request.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const accessToken = session?.user?.accessToken;

        if (accessToken) {
          (config.headers as AxiosHeaders).set(
            "Authorization",
            `Bearer ${accessToken}`
          );
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = request.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          await refreshToken();
          prevRequest.headers[
            "Authorization"
          ] = `Bearer ${session?.user.accessToken}`;
          return request(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      request.interceptors.request.eject(requestIntercept);
      request.interceptors.response.eject(responseIntercept);
    };
  }, [session, refreshToken]);

  return request;
};

export default useAxiosAuth;
