"use client";

import {
  Button,
  Flex,
  Grid,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ShopFilterType } from "./types";
import { useTableContext } from "@/components/shared/table/components/TableContext";
// import { Region } from "@/libs/utils/constants";

export const ShopFilter = () => {
  const methods = useForm<ShopFilterType>({
    defaultValues: {
      id: "",
      name: "",
      status: "",
      // region: "",
    },
  });

  const { control, reset, getValues } = methods;

  const tableCtx = useTableContext();

  const handleSearch = () => {
    const values = getValues();
    tableCtx?.handleChangeParams({
      ...values,
    });
  };

  const handleReset = () => {
    reset({
      id: undefined,
      name: undefined,
      status: undefined,
      region: undefined,
    });
    tableCtx?.handleChangeParams({});
  };

  return (
    <Stack
      style={{
        border: "1px solid #e1e1e1",
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: 600,
          marginBottom: 10,
        }}
      >
        Tìm kiếm
      </Text>

      <Grid>
        <Grid.Col span={6}>
          <Controller
            control={control}
            name="id"
            render={({ field }) => (
              <TextInput type="number" label="ID" {...field} placeholder="ID" />
            )}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <TextInput label="Tên" {...field} placeholder="Nhập tên" />
            )}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select
                label="Trạng thái"
                {...field}
                data={[
                  { label: "Đã phê duyệt", value: "APPROVED" },
                  { label: "Chờ phê duyệt", value: "PENDING" },
                  { label: "Từ chối", value: "REJECTED" },
                ]}
                placeholder="Nhập trạng thái"
              />
            )}
          />
        </Grid.Col>

        {/* <Grid.Col span={6}>
          <Controller
            control={control}
            name="region"
            render={({ field }) => (
              <Select
                label="Vùng miền"
                {...field}
                data={[
                  { label: "Miền Bắc", value: Region.NORTH },
                  { label: "Miền Trung", value: Region.CENTRAL },
                  { label: "Miền Nam", value: Region.SOUTH },
                ]}
                placeholder="Nhập vùng miền"
              />
            )}
          />
        </Grid.Col> */}
      </Grid>

      <Flex gap={12} justify={"flex-end"}>
        <Button variant="outline" onClick={handleReset}>
          Huỷ bỏ
        </Button>
        <Button onClick={handleSearch}>Tìm kiếm</Button>
      </Flex>
    </Stack>
  );
};
