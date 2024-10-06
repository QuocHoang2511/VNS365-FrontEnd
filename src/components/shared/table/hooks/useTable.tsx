// @ts-nocheck
import {
  MRT_ColumnDef,
  MRT_TableOptions,
  useMantineReactTable,
} from "mantine-react-table";
import { MRT_Localization_VI } from "mantine-react-table/locales/vi";

interface Props<T extends Record<string, any>> extends MRT_TableOptions<T> {
  columns: MRT_ColumnDef<T>[];
  data: T[];
}

export const useTable = <T extends Record<string, any>>({
  columns,
  data,
  ...props
}: Props<T>) => {
  const table = useMantineReactTable({
    columns,
    data,
    enableRowNumbers: true,
    localization: MRT_Localization_VI,
    enableDensityToggle: false,
    enableFilters: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enableSorting: false,
    enablePagination: false,
    enableFullScreenToggle: false,
    enableHiding: false,
    enableClickToCopy: true,

    ...props,
  });

  return table;
};
