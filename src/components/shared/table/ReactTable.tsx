"use client";

import { modals } from "@mantine/modals";
import {
  MRT_ColumnDef,
  MRT_PaginationState,
  MRT_Row,
  MRT_RowData,
  MantineReactTable,
} from "mantine-react-table";
import React, { useState } from "react";

import { useTable } from "@/components/shared/table/hooks/useTable";
import {
  ActionIcon,
  Button,
  Flex,
  ScrollArea,
  Stack,
  Tooltip,
} from "@mantine/core";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DataPagination } from "@/libs/types/common";
import { notifications } from "@mantine/notifications";
import { useTableContext } from "./components/TableContext";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";

interface Props<T extends MRT_RowData> {
  endpointAPI: string;
  name: string;
  columns: MRT_ColumnDef<T>[];
  seeDetail?: boolean;
  params?: Record<string, any>;
  handleExportExcel?: (data: T[]) => void;
  hasCreate?: boolean;
  hasEdit?: boolean;
  hasDelete?: boolean;
}

export const ReactTable = <T extends Record<string, any>>({
  endpointAPI,
  columns,
  name,
  seeDetail,
  params,
  handleExportExcel,
  hasCreate,
  hasEdit,
  hasDelete = true,
}: Props<T>) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const tableCtx = useTableContext();
  const request = useAxiosAuth();

  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  });

  const {
    data: fetchedData = {
      data: [],
      meta: {
        currentPage: 0,
        perPage: pagination.pageSize,
        total: 0,
        totalPages: 0,
      },
    },
    isError: isLoadingItemsError,
    isFetching: isFetchingItems,
    isLoading: isLoadingItems,
  } = useQuery<DataPagination<T[]>>({
    queryKey: [name, pagination, params, tableCtx?.params],
    queryFn: async () => {
      const res = await request(`${endpointAPI}`, {
        params: {
          page: pagination.pageIndex + 1,
          perPage: pagination.pageSize,
          ...params,
          ...tableCtx?.params,
        },
      });

      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  const { mutateAsync: deleteItem, isPending: isDeletingItem } = useMutation({
    mutationFn: async (id: number) => {
      const res = await request(`${endpointAPI}/${id}`, {
        method: "DELETE",
      });

      return res.data;
    },
    onMutate: (id: number) => {
      queryClient.setQueryData([name], (prevProds: any) =>
        prevProds?.filter((item: T) => item.id !== id)
      );

      notifications.show({
        title: "Xóa thành công",
        message: "Đã được xóa thành công",
        color: "green",
      });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: [name] }),
  });

  const openDeleteConfirmModal = (row: MRT_Row<T>) =>
    modals.openConfirmModal({
      title: "Bạn có chắc chắn xóa?",
      labels: { confirm: "Xóa", cancel: "Hủy" },
      confirmProps: { color: "red" },
      onConfirm: () => deleteItem(row.original.id),
    });

  const table = useTable({
    columns,
    data: fetchedData ? fetchedData.data : [],
    positionActionsColumn: "last",
    enableEditing: true,
    getRowId: (row) => String(row.id),
    mantineToolbarAlertBannerProps: isLoadingItemsError
      ? {
          color: "red",
          children: "Không có dữ liệu!",
          style: { textAlign: "center" },
        }
      : undefined,
    mantineTableContainerProps: {
      style: {
        minHeight: "500px",
      },
    },
    onPaginationChange: setPagination,
    pageCount: fetchedData?.meta?.totalPages || 0,
    rowCount: fetchedData?.meta?.total || 0,
    renderRowActions: ({ row }) => (
      <Flex gap="md">
        {seeDetail && (
          <Tooltip label="Xem">
            <ActionIcon
              onClick={() => router.push(`${name}/detail/${row.original.id}`)}
            >
              <IconEye />
            </ActionIcon>
          </Tooltip>
        )}

        {hasEdit ? (
          <Tooltip label="Sửa">
            <ActionIcon
              onClick={() => router.push(`${name}/edit/${row.original.id}`)}
            >
              <IconEdit />
            </ActionIcon>
          </Tooltip>
        ) : null}

        {hasDelete ? (
          <Tooltip label="Delete">
            <ActionIcon color="red" onClick={() => openDeleteConfirmModal(row)}>
              <IconTrash />
            </ActionIcon>
          </Tooltip>
        ) : null}
      </Flex>
    ),
    state: {
      isLoading: isLoadingItems,
      isSaving: isDeletingItem,
      showAlertBanner: isLoadingItemsError,
      showProgressBars: isFetchingItems,
      pagination: pagination,
    },
  });

  return (
    <Stack>
      <Flex gap="md">
        {hasCreate ? (
          <Button
            onClick={() => {
              router.push(`${name}/create`);
            }}
          >
            Tạo mới
          </Button>
        ) : null}

        {handleExportExcel && (
          <Button onClick={() => handleExportExcel(fetchedData?.data)}>
            Xuất Excel
          </Button>
        )}
      </Flex>
      <ScrollArea
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <MantineReactTable table={table} />
      </ScrollArea>
    </Stack>
  );
};
