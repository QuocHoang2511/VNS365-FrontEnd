import * as XLSX from "xlsx";

export interface Column<T> {
  accessorKey: keyof T;
  header: string;
  getData?: (item: T) => any;
}

interface GetExportProps<K> {
  title?: string;
  worksheetname?: string;
  columns: Column<K>[];
  data: K[];
}

export const onGetExport = async <K>({
  title,
  worksheetname,
  columns,
  data,
}: GetExportProps<K>) => {
  try {
    if (data && Array.isArray(data)) {
      const dataToExport = data.map((item: K) => {
        const exportedData: any = {};
        columns.forEach((column) => {
          console.log("accessorKey", column.accessorKey);

          switch (true) {
            case typeof column?.getData == "function":
              exportedData[column.header] = column.getData(item);
              console.log(
                "typeof column?.getData == function",
                column.getData(item)
              );
              break;

            case typeof column.accessorKey == "string" &&
              column.accessorKey.includes("."):
              const keys = column.accessorKey.split(".");
              let value = item;
              keys.forEach((key: any) => {
                console.log("key", key);
                console.log("value", value);

                // @ts-ignore
                value = value?.[key as any];
              });
              exportedData[column.header] = value;
              console.log("typeof column.accessorKey == string", value);
              break;
            default:
              exportedData[column.header] = item[column.accessorKey];
              console.log("default", item[column.accessorKey]);
              break;
          }
        });

        return exportedData;
      });

      console.log("dataToExport", dataToExport);

      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);

      XLSX.writeFile(workbook, `${title}.xlsx`);
      console.log(`Exported data to ${title}.xlsx`);
    } else {
      console.log("#==================Export Error");
    }
  } catch (error: any) {
    console.log("#==================Export Error", error.message);
  }
};
