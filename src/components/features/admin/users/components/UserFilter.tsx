"use client";

import { Button, Flex, Grid, Stack, Text, TextInput } from "@mantine/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { UserFilterType } from "./types";
import { useTableContext } from "@/components/shared/table/components/TableContext";

export const UserFilter = () => {
  const methods = useForm<UserFilterType>({
    defaultValues: {
      id: "",
      name: "",
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
              <TextInput label="Tên" {...field} placeholder="Name" />
            )}
          />
        </Grid.Col>
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
