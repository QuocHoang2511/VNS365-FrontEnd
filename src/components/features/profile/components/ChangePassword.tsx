"use client";

import { Button, Flex, PasswordInput, Stack } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import React from "react";

import { Controller, useForm } from "react-hook-form";
import { ChangePasswordInputSchema, ChangePasswordInputType } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { toast } from "react-toastify";
import { notifications } from "@mantine/notifications";

export const ChangePassword = () => {
  const requestAuth = useAxiosAuth();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ChangePasswordInputType>({
    resolver: zodResolver(ChangePasswordInputSchema),
    defaultValues: {
      confirm_password: "",
      new_password: "",
      current_password: "",
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (data: ChangePasswordInputType) => {
      const response = await requestAuth.post("/auth/change-password", {
        currentPassword: data.current_password,
        newPassword: data.new_password,
      });
      return response.data;
    },

    onSuccess: () => {
      reset();
      notifications.show({
        title: "Thành công",
        message: "Đổi mật khẩu thành công.",
        color: "green",
      });
    },

    onError: (error: any) => {
      notifications.show({
        title: "Lỗi đổi mật khẩu",
        message:
          error.response.data.message ||
          "Đã có lỗi xảy ra. Vui lòng thử lại sau!",
        color: "red",
      });
    },
  });

  const onSubmit = async (data: ChangePasswordInputType) => {
    mutateAsync(data);
  };

  return (
    <Stack style={{ maxWidth: 600 }}>
      <Controller
        control={control}
        name="current_password"
        render={({ field }) => (
          <PasswordInput
            {...field}
            label="Mật khẩu hiện tại"
            placeholder="Nhập mật khẩu hiện tại"
            error={errors.current_password?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="new_password"
        render={({ field }) => (
          <PasswordInput
            {...field}
            label="Mật khẩu mới"
            placeholder="Nhập mật khẩu mới"
            error={errors.new_password?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="confirm_password"
        render={({ field }) => (
          <PasswordInput
            {...field}
            label="Xác nhận mật khẩu"
            placeholder="Nhập lại mật khẩu mới"
            error={errors.confirm_password?.message}
          />
        )}
      />

      <Flex gap={16}>
        <Button
          onClick={handleSubmit(onSubmit)}
          color="orange"
          type="button"
          loading={isSubmitting}
          fullWidth
        >
          Cập nhật
        </Button>

        <Button
          variant="outline"
          color="orange"
          onClick={() => reset()}
          fullWidth
        >
          Hủy
        </Button>
      </Flex>
    </Stack>
  );
};
