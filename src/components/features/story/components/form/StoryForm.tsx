"use client";

import React from "react";
import { Controller, useForm, FormProvider } from "react-hook-form";
import { StoryInputSchema, StoryInputType } from "../../types";
import {
  Button,
  FileInput,
  Select,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import { MyEditor } from "@/components/shared/inputs";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconUpload } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { uploadToFirebase } from "@/libs/firebase/firebaseConfig";
import { toast } from "react-toastify";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export const StoryForm = () => {
  const { data: sessions } = useSession();

  const requestAuth = useAxiosAuth();

  const router = useRouter();

  const methods = useForm<StoryInputType>({
    resolver: zodResolver(StoryInputSchema),
  });

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = methods;

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: StoryInputType) => {
      const image = await uploadToFirebase(
        data.featured_image,
        (progress: number) => {}
      );

      const res = await requestAuth.post(
        sessions?.user?.role == "ADMIN" ? "/admin/story" : "/story",
        {
          ...data,
          featured_image: image?.downloadUrl,
        }
      );
      return res.data;
    },
    onError: () => {
      toast.error("Đã có lỗi xảy ra");
    },
    onSuccess: () => {
      toast.success("Đăng bài thành công");

      if (sessions?.user?.role == "ADMIN") {
        router.back();
      } else {
        router.push("/experience");
      }
    },
  });

  const onSubmit = (data: StoryInputType) => {
    mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <Stack
        style={{
          gap: 16,
          alignItems: "flex-start",
          margin: "unset",
        }}
      >
        <Controller
          name="featured_image"
          control={control}
          render={({ field: { onChange, value } }) => (
            <FileInput
              clearable
              label="Ảnh"
              value={value}
              accept="image/png,image/jpeg"
              onChange={onChange}
              rightSection={<IconUpload />}
              error={errors.featured_image?.message as string}
              style={{
                width: "400px",
              }}
            />
          )}
        />

        <Controller
          name="title"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              onChange={onChange}
              value={value}
              error={errors.title?.message}
              label="Tiêu đề"
              style={{
                width: "100%",
              }}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Textarea
              onChange={onChange}
              value={value}
              error={errors.description?.message}
              label="Mô tả"
              style={{
                width: "100%",
              }}
            />
          )}
        />

        <Controller
          name="region_id"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              onChange={onChange}
              value={value}
              data={[
                {
                  label: "Miền Bắc",
                  value: "1",
                },
                {
                  label: "Miền Trung",
                  value: "2",
                },
                {
                  label: "Miền Nam",
                  value: "3",
                },
              ]}
              error={errors.region_id?.message}
              label={"Chọn vùng miền"}
              style={{
                width: "100%",
              }}
            />
          )}
        />

        <Controller
          name="content"
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <MyEditor
              innerRef={ref}
              id="content"
              onChange={onChange}
              value={value}
              error={errors.content?.message}
              label={"Nội dung bài viết"}
            />
          )}
        />

        <Controller
          name="cooking_method"
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <MyEditor
              innerRef={ref}
              id="cooking_method"
              onChange={onChange}
              value={value}
              error={errors.cooking_method?.message}
              label={"Cách chế biến"}
            />
          )}
        />

        <Button
          onClick={handleSubmit(onSubmit)}
          loading={isSubmitting || isPending}
        >
          Đăng bài
        </Button>
      </Stack>
    </FormProvider>
  );
};
