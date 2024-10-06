import { Flex, TextInput } from "@mantine/core";
import React from "react";

interface Props {
  setSearch: (newValue: React.SetStateAction<string>) => void;
}

export const Filter = ({ setSearch }: Props) => {
  return (
    <Flex gap={12}>
      <TextInput
        style={{
          width: "100%",
        }}
        placeholder="Nhập món ăn tìm kiếm"
        onChange={(event) => setSearch(event.currentTarget.value)}
      />
    </Flex>
  );
};
