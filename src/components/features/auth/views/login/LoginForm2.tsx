"use client";

import React, { useEffect, useState } from "react";
import loginImage from "@/assets/images/Login.png";

import { Controller, useForm } from "react-hook-form";
import Link from "next/link";
import {
  Button,
  Image,
  Loader,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginInputSchema, LoginInputType } from "./types";
import { signIn } from "next-auth/react";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

// const schema = yup
//   .object({
//     username: yup.string().required(),
//     password: yup.string().required(),
//   })
//   .required();

function LoginV2() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginInputType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginInputSchema),
  });

  const [loading, setLoading] = useState(false);

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

        notifications.show({
          title: "Đăng nhập thành công",
          message: "Chào mừng bạn quay trở lại!",
          color: "teal",
        });

        localStorage.setItem("isLogin", "true");
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
    <div className="fixed inset-0 flex items-center ">
      <div className="h-full w-auto object-cover">
        <Image
          src={loginImage.src}
          alt="Images"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute m-auto rounded-l-[50px]  h-full right-0 w-[50%] bg-gradient-to-b from-[#ef6f1f80] to-[#FFFFFF00] px-40">
        <Stack
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "10%",
          }}
        >
          <h1 className="text-primaryColor text-center text-3xl font-semibold pb-16 drop-shadow-sm">
            Đăng Nhập
          </h1>
          <form
            method="post"
            onSubmit={onSubmit}
            action="/api/auth/callback/credentials"
            className="account-form flex flex-col gap-4 w-full"
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

            <Button
              style={{
                backgroundColor: "#FA4A0C",
                // width: "210px",
              }}
              mt={"md"}
              fullWidth
              radius={"xl"}
              type="submit"
              loading={loading}
            >
              Đăng nhập
            </Button>

            <div className="mt-4">
              <h2 className="text-[#8D8D8D] ">
                Bạn chưa có tài khoản?{" "}
                <Link
                  href="/register"
                  className="text-base text-primaryColor font-medium"
                >
                  Đăng Kí
                </Link>
              </h2>
            </div>
          </form>
        </Stack>
      </div>
    </div>
  );
}

export { LoginV2 };
