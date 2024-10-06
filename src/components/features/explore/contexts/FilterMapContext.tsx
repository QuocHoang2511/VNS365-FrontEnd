"use client";

import React, { createContext, useContext, useState } from "react";

interface FilterMapContextValue {
  params: Record<string, any>;
  handleChangeParams: (newParams: Record<string, any>) => void;
}

const FilterMapContext = createContext<FilterMapContextValue | null>(null);

export const useFilterMapContext = () => {
  return useContext(FilterMapContext);
};

export const FilterMapContextProvider = ({
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
    <FilterMapContext.Provider
      value={{
        params,
        handleChangeParams,
      }}
    >
      {children}
    </FilterMapContext.Provider>
  );
};
