"use client";

import { MRT_ColumnDef } from "mantine-react-table";
import React, { useMemo } from "react";

import { ReactTable } from "@/components/shared/table/ReactTable";
import { TableContextProvider } from "@/components/shared/table/components/TableContext";

import { IUser } from "@/libs/types/user";
import { ROLE } from "@/libs/utils/constants";
import { UserFilter } from "./components/UserFilter";

export const UserManagement = () => {
  const columns = useMemo<MRT_ColumnDef<IUser>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "name",
        header: "Tên",
      },
      {
        accessorKey: "phone_number",
        header: "Số điện thoại",
      },
      {
        accessorKey: "address",
        header: "Địa chỉ",
      },
      {
        accessorKey: "role",
        header: "Vai trò",
        Cell(props) {
          return (
            <span>{ROLE[props.row.original.role as keyof typeof ROLE]}</span>
          );
        },
      },
    ],
    []
  );

  return (
    <TableContextProvider>
      <UserFilter />

      <ReactTable
        endpointAPI={"/admin/users"}
        name={"users"}
        columns={columns}
        // hasCreate
        hasEdit
      />
    </TableContextProvider>
  );
};
