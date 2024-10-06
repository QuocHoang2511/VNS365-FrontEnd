"use client";

import React, { useEffect, useState } from "react";
import loginImage from "@/assets/images/Login.png";

import { Controller, useForm } from "react-hook-form";
import Link from "next/link";
import { Button, Image, PasswordInput, Stack, TextInput } from "@mantine/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterInputSchema, RegisterInputType } from "./types";
import { signIn } from "next-auth/react";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { request } from "@/libs/request";

export const RegisterForm = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInputType>({
    resolver: zodResolver(RegisterInputSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      phone_number: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = handleSubmit(async (value: RegisterInputType, event) => {
    try {
      event?.preventDefault();
      setLoading(true);

      const newUser = await request.post(`auth/register`, {
        name: value.username,
        email: value.email,
        password: value.password,
        phone_number: value.phone_number,
        address: value.address,
      });

      const res = await signIn("credentials", {
        redirect: false,
        email: newUser.data.email,
        password: newUser.data.password,
      });

      if (!res?.error) {
        router.push("/");

        localStorage.setItem("isLogin", "true");
      } else {
        throw new Error("CredentialsSignin-401");
      }
    } catch (error: any) {
      console.log("error", error);

      if (error.message === "CredentialsSignin-401") {
        notifications.show({
          title: "Lỗi đăng kí",
          message: "Email hoặc mật khẩu không chính xác. Vui lòng thử lại!",
          color: "red",
        });
      } else {
        notifications.show({
          title: "Lỗi đăng kí",
          message:
            error.response.data.message ||
            "Đã có lỗi xảy ra. Vui lòng thử lại sau!",
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
            Đăng Kí
          </h1>
          <form
            method="post"
            onSubmit={onSubmit}
            action="/api/auth/callback/credentials"
            className="account-form flex flex-col gap-4 w-full"
          >
            <Controller
              name="username"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  withAsterisk
                  label={"Tên"}
                  placeholder={"Nhập tên của bạn"}
                  value={value}
                  onChange={onChange}
                  error={errors.username?.message as string}
                />
              )}
            />

            <Controller
              control={control}
              name="phone_number"
              render={({ field }) => (
                <TextInput
                  {...field}
                  type="tel"
                  label="Số điện thoại"
                  placeholder="Nhập số điện thoại"
                  error={errors.phone_number?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="address"
              render={({ field }) => (
                <TextInput
                  {...field}
                  label="Địa chỉ"
                  placeholder="Nhập địa chỉ"
                  error={errors.address?.message}
                />
              )}
            />

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

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field: { onChange, value } }) => (
                <PasswordInput
                  withAsterisk
                  label="Xác nhận mật khẩu"
                  placeholder="Nhập lại mật khẩu của bạn"
                  value={value}
                  onChange={onChange}
                  error={errors.confirmPassword?.message as string}
                />
              )}
            />

            <Button
              style={{
                backgroundColor: "#FA4A0C",
              }}
              mt={"md"}
              fullWidth
              radius={"xl"}
              type="submit"
              loading={loading}
            >
              Đăng kí
            </Button>

            <div className="text-base">
              <h2 className=" text-[#8D8D8D]">
                Bạn đã có tài khoản?{" "}
                <Link
                  href="/login"
                  className="text-base text-primaryColor font-medium"
                >
                  Đăng Nhập
                </Link>
              </h2>
            </div>
          </form>
        </Stack>
      </div>
    </div>
  );
};
