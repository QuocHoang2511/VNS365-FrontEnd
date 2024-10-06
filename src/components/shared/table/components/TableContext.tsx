"use client";

import React, { createContext, useContext, useState } from "react";

interface TableContextValue {
  params: Record<string, any>;
  handleChangeParams: (newParams: Record<string, any>) => void;
}

const TableContext = createContext<TableContextValue | null>(null);

export const useTableContext = () => {
  return useContext(TableContext);
};

export const TableContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [params, setParams] = useState<Record<string, any>>({});

  const handleChangeParams = (newParams: Record<string, any>) => {
    setParams((prev) => ({
      ...prev,
      ...newParams,
    }));
  };

  return (
    <TableContext.Provider
      value={{
        params,
        handleChangeParams,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
