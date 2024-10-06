"use client";

import { MRT_ColumnDef } from "mantine-react-table";
import React, { useMemo } from "react";

import { ReactTable } from "@/components/shared/table/ReactTable";
import { TableContextProvider } from "@/components/shared/table/components/TableContext";

import { COLOR_STATUS, STATUS } from "@/libs/utils/constants";
import { ShopFilter } from "./components/ShopFilter";
import { IShop } from "@/libs/types/story";
import { Image, Text, Tooltip } from "@mantine/core";

export const ShopManagement = () => {
  const columns = useMemo<MRT_ColumnDef<IShop>[]>(
    () => [
      {
        accessorKey: "image",
        header: "Ảnh",
        Cell: ({ row }) => {
          return (
            <Image
              src={row.original.image}
              style={{
                width: 64,
                height: 64,
              }}
              alt="image"
            />
          );
        },
        size: 100,
      },
      {
        accessorKey: "name",
        header: "Tên",
      },
      {
        accessorKey: "description",
        header: "Mô tả",
        Cell: ({ row }) => {
          return (
            <Tooltip label={row.original.description}>
              <Text lineClamp={2}>{row.original.description}</Text>
            </Tooltip>
          );
        },
      },
      {
        accessorKey: "address",
        header: "Địa chỉ",
      },
      {
        accessorKey: "phone_number",
        header: "Số điện thoại",
      },
      {
        accessorKey: "status",
        header: "Trạng thái",
        Cell: ({ row }) => {
          return (
            <Text
              color={
                COLOR_STATUS[row.original.status as keyof typeof COLOR_STATUS]
              }
            >
              {STATUS[row.original.status as keyof typeof STATUS]}
            </Text>
          );
        },
      },
    ],
    []
  );

  return (
    <TableContextProvider>
      <ShopFilter />

      <ReactTable
        endpointAPI={"/admin/shop"}
        name={"shop"}
        columns={columns}
        seeDetail
        hasCreate
      />
    </TableContextProvider>
  );
};
