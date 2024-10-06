"use client";

import { Button, PasswordInput, Select, Stack, TextInput } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

import { Controller, useForm } from "react-hook-form";
import { RoleType, UserInputSchema, UserInputType } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { IUser } from "@/libs/types/user";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { useCreateOrUpdate } from "@/libs/hooks/useCreateOrUpdate";

export const UserForm = () => {
  const request = useAxiosAuth();

  const { id } = useParams();
  const isEdit = !!id;

  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<UserInputType>({
    resolver: zodResolver(UserInputSchema),
    defaultValues: {
      email: "",
      name: "",
      phone_number: "",
      password: "",
      address: "",
    },
  });

  const { data } = useQuery<IUser>({
    queryKey: ["users", id],
    queryFn: async () => {
      const res = await request.get(`/admin/users/${id}`);
      return res.data;
    },
    enabled: isEdit,
  });

  const { mutateAsync } = useCreateOrUpdate({
    endpointAPI: "/admin/users",
    queryKey: "users",
    id: Number(data?.id),
  });

  useEffect(() => {
    if (data) {
      setValue("email", data.email);
      setValue("name", data.name);
      setValue("phone_number", data.phone_number);
      setValue("password", data.password);
      setValue("role", data.role as RoleType);
      setValue("address", data.address);
    }
  }, [data, setValue]);

  const onSubmit = async (data: UserInputType) => {
    mutateAsync(data);
  };

  return (
    <Stack style={{ maxWidth: 400 }}>
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <TextInput
            {...field}
            label="Email"
            placeholder="Email"
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <TextInput
            {...field}
            label="Tên"
            placeholder="Nhập tên"
            error={errors.name?.message}
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
        control={control}
        name="password"
        render={({ field }) => (
          <PasswordInput
            {...field}
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            error={errors.password?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="role"
        render={({ field }) => (
          <Select
            {...field}
            label="Vai trò"
            placeholder="Nhập vai trò"
            error={errors.role?.message}
            data={[
              { value: "ADMIN", label: "Quản trị viên" },
              { value: "USER", label: "Người dùng" },
            ]}
          />
        )}
      />

      <Button
        onClick={handleSubmit(onSubmit)}
        color="blue"
        variant="outline"
        type="button"
        loading={isSubmitting}
      >
        {isEdit ? "Cập nhật" : "Tạo mới"}
      </Button>
    </Stack>
  );
};
