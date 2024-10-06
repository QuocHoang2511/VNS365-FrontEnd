"use client";

import { Button, Flex, Loader, Stack, TextInput } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

import { Controller, useForm } from "react-hook-form";
import { UserInputSchema, UserInputType } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { IUser } from "@/libs/types/user";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { useCreateOrUpdate } from "@/libs/hooks/useCreateOrUpdate";

export const ProfileForm = () => {
  const requestAuth = useAxiosAuth();

  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserInputType>({
    resolver: zodResolver(UserInputSchema),
    defaultValues: {
      email: "",
      name: "",
      phone_number: "",
      address: "",
    },
  });

  const { data, isLoading } = useQuery<IUser>({
    queryKey: ["profile", "me"],
    queryFn: async () => {
      const response = await requestAuth.get("/auth/me");
      return response.data;
    },
    enabled: JSON.parse(localStorage.getItem("isLogin") || "false"),
  });
  const { mutateAsync } = useCreateOrUpdate({
    endpointAPI: "/admin/users",
    queryKey: "me",
    id: Number(data?.id),
  });

  useEffect(() => {
    if (data) {
      setValue("email", data.email);
      setValue("name", data.name);
      setValue("phone_number", data.phone_number);
      setValue("address", data.address);
    }
  }, [data, setValue]);

  const onSubmit = async (data: UserInputType) => {
    mutateAsync(data);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Stack style={{ maxWidth: 600 }}>
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
