import { Box, Flex, Image, Input, Loader, Stack, Text } from "@mantine/core";
import React from "react";
import classes from "./Style.module.css";
import { IconSearch } from "@tabler/icons-react";
import { useDebouncedState } from "@mantine/hooks";
import Link from "next/link";
import { useSearch } from "@/libs/hooks/useSearch";

export const SearchBox = () => {
  const [value, setValue] = useDebouncedState("", 300);
  const searchResult = useSearch({ query: value });

  const clearSearch = () => {
    setValue("");
  };

  return (
    <Box
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "600px",
      }}
    >
      <Flex className={classes.search_box}>
        <Input
          onChange={(event) => setValue(event.currentTarget.value)}
          className={classes.text_search}
          placeholder="Nhập từ khoá cần tìm kiếm"
          styles={{
            input: {
              outline: "none",
              border: "none",
              height: "40px",
            },
          }}
        />
        <Box className={classes.btn_search}>
          {searchResult.isLoading ? (
            <Loader size={20} />
          ) : (
            <IconSearch size={20} color="#fff" />
          )}
        </Box>

        {searchResult.data && searchResult.data.length > 0 && (
          <DropdownSearch
            data={searchResult.data}
            isLoading={searchResult.isLoading}
            clearSearch={clearSearch}
          />
        )}
      </Flex>
    </Box>
  );
};

interface DropdownSearchProps {
  data: any[];
  isLoading: boolean;
  clearSearch: () => void;
}

export const DropdownSearch = ({
  data,
  isLoading,
  clearSearch,
}: DropdownSearchProps) => {
  return (
    <Box
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        background: "white",
        zIndex: 999,
        padding: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        maxHeight: "300px",
        overflow: "auto",
        borderRadius: "8px",
      }}
    >
      {isLoading && <div>Loading...</div>}
      {data.map((product) => (
        <Link
          key={product.id}
          href={`/product/${product.id}`}
          style={{
            textDecoration: "none",
            color: "black",
            display: "block",
            padding: "10px",
          }}
          onClick={clearSearch}
        >
          <Flex gap={12}>
            <Image
              src={product.productImage.large}
              w={36}
              h={36}
              alt={product.productName}
            />
            <Text lineClamp={2}>{product.productName}</Text>
          </Flex>
        </Link>
      ))}
    </Box>
  );
};
