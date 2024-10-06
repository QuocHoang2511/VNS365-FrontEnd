"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Paper, PasswordInput, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { LoginInputSchema, LoginInputType } from "./types";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getRole } from "@/libs/utils/authUtils";

export const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginInputType>({
    defaultValues: {
      email: "admin@gmail.com",
      password: "123123a",
    },
    resolver: zodResolver(LoginInputSchema),
  });

  const onSubmit = handleSubmit(async (value: LoginInputType, event) => {
    try {
      event?.preventDefault();
      setLoading(true);

      const res = await signIn("credentials", {
        redirect: false,
        email: value.email,
        password: value.password,
      });

      if (!res?.error) {
        router.push("/");
      } else {
        throw new Error("CredentialsSignin-401");
      }
    } catch (error: any) {
      console.log("error", error);

      if (error.message === "CredentialsSignin-401") {
        notifications.show({
          title: "Lỗi đăng nhập",
          message: "Email hoặc mật khẩu không chính xác. Vui lòng thử lại!",
          color: "red",
        });
      } else {
        notifications.show({
          title: "Lỗi đăng nhập",
          message: "Đã có lỗi xảy ra. Vui lòng thử lại sau!",
          color: "red",
        });
      }
    } finally {
      setLoading(false);
    }
  });

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <form
        method="post"
        onSubmit={onSubmit}
        action="/api/auth/callback/credentials"
        className="account-form"
      >
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              withAsterisk
              label={"Email"}
              placeholder={"Nhập email"}
              value={value}
              onChange={onChange}
              error={errors.email?.message as string}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, value } }) => (
            <PasswordInput
              withAsterisk
              label="Mật khẩu"
              placeholder="Mật khẩu của bạn"
              value={value}
              onChange={onChange}
              error={errors.password?.message as string}
            />
          )}
        />

        <Button fullWidth type="submit" mt="xl" loading={loading}>
          Đăng nhập
        </Button>
      </form>
    </Paper>
  );
};
