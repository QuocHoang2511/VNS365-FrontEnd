import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Grid, Select, Stack, TextInput } from "@mantine/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  RecommendRestaurantInputSchema,
  RecommendRestaurantInputType,
} from "./types";
import { useMutation } from "@tanstack/react-query";
import { DropzoneImage } from "./DropzoneImage";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { provinceVN } from "@/libs/utils/provinceVN";

export const RecommendRestaurant = () => {
  const requestAuth = useAxiosAuth();
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RecommendRestaurantInputType>({
    resolver: zodResolver(RecommendRestaurantInputSchema),
    defaultValues: {
      name: "",
      description: "",
      phone_number: "",
      address: "",
      image: "",
      province_id: "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: RecommendRestaurantInputType) => {
      const response = await requestAuth.post("/shop/recommend", {
        ...data,
        province_id: parseInt(data.province_id),
      });
      return response.data;
    },
    onSuccess: () => {
      notifications.show({
        title: "Gửi thành công",
        message: "Nhà hàng gợi ý của bạn đã được gửi thành công",
        color: "green",
      });

      router.push("/");
    },
  });

  const onSubmit = async (data: RecommendRestaurantInputType) => {
    mutateAsync(data);
  };

  return (
    <Grid>
      <Grid.Col
        span={{
          xs: 12,
          md: 4,
        }}
      >
        <Controller
          control={control}
          name="image"
          render={({ field: { onChange, value } }) => (
            <DropzoneImage
              value={value}
              onChange={onChange}
              error={errors.image?.message}
            />
          )}
        />
      </Grid.Col>

      <Grid.Col
        span={{
          xs: 12,
          md: 8,
        }}
      >
        <Stack>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <TextInput
                {...field}
                label="Tên nhà hàng"
                placeholder="Nhập tên nhà hàng"
                error={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <TextInput
                {...field}
                label="Mô tả nhà hàng"
                placeholder="Nhập mô tả nhà hàng"
                error={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="province_id"
            render={({ field }) => (
              <Select
                {...field}
                label="Tỉnh thành"
                placeholder="Nhập tỉnh thành"
                data={provinceVN.map((province, index) => ({
                  value: index + 1 + "",
                  label: province,
                }))}
                error={errors.province_id?.message}
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
            name="phone_number"
            render={({ field }) => (
              <TextInput
                {...field}
                type="number"
                label="Số điện thoại"
                placeholder="Nhập số điện thoại"
                error={errors.phone_number?.message}
              />
            )}
          />

          <Flex gap={16} justify={"flex-end"}>
            <Button
              onClick={handleSubmit(onSubmit)}
              color="orange"
              loading={isSubmitting || isPending}
              style={{ width: 120 }}
            >
              Gửi
            </Button>
          </Flex>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};
