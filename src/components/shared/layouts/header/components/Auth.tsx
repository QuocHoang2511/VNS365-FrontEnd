import { Flex, Text } from "@mantine/core";
import React from "react";
import { UserAccount } from "./UserAccount";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";

export const Auth = () => {
  const requestAuth = useAxiosAuth();
  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await requestAuth.get("auth/me");
      return res.data;
    },
    enabled: JSON.parse(localStorage.getItem("isLogin") || "false"),
  });

  const router = useRouter();

  const isLogin = !!data?.email;

  return !isLogin ? (
    <Flex gap={8}>
      {/* <Text
        style={{
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: 600,
        }}
        onClick={() => console.log("Dang ky")}
      >
        Đăng ký
      </Text>
      <span
        style={{
          fontSize: "14px",
          fontWeight: 600,
        }}
      >
        |
      </span> */}
      <Text
        style={{
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: 600,
        }}
        onClick={() => router.push("/login")}
      >
        Đăng nhập
      </Text>
    </Flex>
  ) : (
    <UserAccount user={data} />
  );
};
