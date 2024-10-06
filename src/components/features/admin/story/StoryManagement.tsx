"use client";

import { MRT_ColumnDef } from "mantine-react-table";
import React, { useMemo } from "react";

import { ReactTable } from "@/components/shared/table/ReactTable";
import { TableContextProvider } from "@/components/shared/table/components/TableContext";

import { COLOR_STATUS, STATUS } from "@/libs/utils/constants";
import { StoryFilter } from "./components/StoryFilter";
import { IStory } from "@/libs/types/story";
import { Image, Text } from "@mantine/core";

export const StoryManagement = () => {
  const columns = useMemo<MRT_ColumnDef<IStory>[]>(
    () => [
      {
        accessorKey: "featured_image",
        header: "",
        Cell: ({ row }) => {
          return (
            <Image
              src={row.original.featured_image}
              style={{
                width: 64,
                height: 64,
              }}
              alt="featured_image"
            />
          );
        },
        size: 100,
      },
      {
        accessorKey: "title",
        header: "Tên",
      },
      {
        accessorKey: "description",
        header: "Mô tả",
        Cell: ({ row }) => {
          return <Text lineClamp={2}>{row.original.description}</Text>;
        },
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
      <StoryFilter />

      <ReactTable
        endpointAPI={"/admin/story"}
        name={"story"}
        columns={columns}
        seeDetail
        hasCreate
      />
    </TableContextProvider>
  );
};
