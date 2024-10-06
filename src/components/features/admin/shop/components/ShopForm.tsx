import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Flex,
  Grid,
  Select,
  Stack,
  TagsInput,
  TextInput,
} from "@mantine/core";
import React, { use, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  RecommendRestaurantInputSchema,
  RecommendRestaurantInputType,
} from "./types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { useParams, useRouter } from "next/navigation";
import { DropzoneImage } from "@/components/features/profile/components/DropzoneImage";
import { IShop } from "@/libs/types/story";
import { provinceVN } from "@/libs/utils/provinceVN";

export const ShopForm = () => {
  const params = useParams();
  const isEdit = !!params.id;
  const queryClient = useQueryClient();

  const requestAuth = useAxiosAuth();
  const router = useRouter();
  const {
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RecommendRestaurantInputType>({
    resolver: zodResolver(RecommendRestaurantInputSchema),
    defaultValues: {
      name: "",
      description: "",
      phone_number: "",
      address: "",
      image: "",
      foods: [],
      province_id: "",
    },
  });

  const { data: shopData } = useQuery<IShop>({
    queryKey: ["shop", params?.id],
    queryFn: async () => {
      const response = await requestAuth.get(`/admin/shop/${params.id}`);
      return response.data;
    },
    enabled: isEdit,
  });

  useEffect(() => {
    if (shopData) {
      setValue("name", shopData.name);
      setValue("description", shopData.description);
      setValue("phone_number", shopData.phone_number);
      setValue("address", shopData.address);
      setValue("image", shopData.image);
      setValue(
        "foods",
        shopData.shopFoods.map((food) => food.food)
      );
      setValue("province_id", shopData.province_id + "");
    }
  }, [shopData, setValue, reset]);

  const { mutate: mutateAdd } = useMutation({
    mutationFn: async (data: RecommendRestaurantInputType) => {
      const response = await requestAuth.post("/admin/shop", {
        ...data,
        province_id: parseInt(data.province_id),
      });
      return response.data;
    },

    onSuccess: () => {
      notifications.show({
        title: "Gửi thành công",
        message: "Thêm mới cửa hàng thành công",
        color: "green",
      });

      router.back();
    },
  });

  const { mutate: mutateAction } = useMutation({
    mutationFn: async ({ action }: { action: "APPROVED" | "REJECTED" }) => {
      const response = await requestAuth.patch(`/admin/shop/${params?.id}`, {
        status: action,
      });
      return response.data;
    },

    onSuccess: () => {
      notifications.show({
        title: "Thành công",
        message: "",
        color: "green",
      });

      queryClient.invalidateQueries({
        queryKey: ["shop", params?.id],
      });

      router.back();
    },

    onError: (error: any) => {
      notifications.show({
        title: "Có lỗi xảy ra",
        message: error?.response?.data?.message || "Có lỗi xảy ra",
        color: "red",
      });
    },
  });

  const handleAddShop = async (data: RecommendRestaurantInputType) => {
    mutateAdd(data);
  };

  const { mutate: mutateUpdateFoods } = useMutation({
    mutationFn: async ({ foods }: { foods: string[] }) => {
      const response = await requestAuth.patch(
        `/admin/shop/${params?.id}/food`,
        {
          foods: foods,
        }
      );
      return response.data;
    },

    onSuccess: () => {
      notifications.show({
        title: "Thành công",
        message: "",
        color: "green",
      });

      router.back();
    },

    onError: (error: any) => {
      notifications.show({
        title: "Có lỗi xảy ra",
        message: error?.response?.data?.message || "Có lỗi xảy ra",
        color: "red",
      });
    },
  });

  const handleUpdateFoods = async (data: RecommendRestaurantInputType) => {
    mutateUpdateFoods({
      foods: data.foods,
    });
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
              disabled={isEdit}
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
                disabled={isEdit}
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
                disabled={isEdit}
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
                disabled={isEdit}
                clearable
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
                disabled={isEdit}
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
                disabled={isEdit}
              />
            )}
          />

          <Controller
            control={control}
            name="foods"
            render={({ field }) => (
              <TagsInput
                {...field}
                label="Món ăn"
                placeholder="Nhập món ăn"
                error={errors.foods?.message}
              />
            )}
          />

          <Flex gap={16} justify={"flex-end"}>
            {isEdit ? (
              shopData?.status === "PENDING" ? (
                <>
                  <Button
                    onClick={() => mutateAction({ action: "APPROVED" })}
                    color="orange"
                    loading={isSubmitting}
                    style={{ width: 120 }}
                  >
                    Phê duyệt
                  </Button>
                  <Button
                    onClick={() => mutateAction({ action: "REJECTED" })}
                    color="orange"
                    variant="outline"
                    loading={isSubmitting}
                    style={{ width: 120 }}
                  >
                    Từ chối
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleSubmit(handleUpdateFoods)}
                  color="orange"
                  variant="outline"
                >
                  Cập nhật món ăn
                </Button>
              )
            ) : (
              <Button
                onClick={handleSubmit(handleAddShop)}
                color="orange"
                loading={isSubmitting}
                style={{ width: 120 }}
              >
                Thêm mới
              </Button>
            )}
          </Flex>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};
