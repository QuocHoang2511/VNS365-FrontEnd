"use client";

import { Banner } from "@/components/shared/banners/Banner";
import {
  Container,
  Flex,
  Grid,
  Loader,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import React from "react";
import { ShopCard } from "./components/ShopCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { IShop } from "@/libs/types/story";
import { useDebouncedState } from "@mantine/hooks";
import { provinceVN } from "@/libs/utils/provinceVN";

export const Shop = () => {
  const requestAuth = useAxiosAuth();
  const [search, setSearch] = useDebouncedState("", 500);
  const [province, setProvince] = useDebouncedState<number | undefined>(
    undefined,
    500
  );

  const { data, isLoading } = useQuery<IShop[]>({
    queryKey: ["shop", search, province],
    queryFn: async () => {
      const response = await requestAuth.get("/shop", {
        params: {
          nameFood: search,
          province,
        },
      });
      return response.data.data;
    },
  });

  return (
    <Stack mb={30}>
      <Banner />
      <Container
        size={"lg"}
        mih={400}
        style={{
          width: "100%",
        }}
      >
        <Flex gap={12}>
          <TextInput
            style={{
              width: "250px",
            }}
            placeholder="Nhập tên món ăn"
            onChange={(event) => setSearch(event.currentTarget.value)}
          />
          <Select
            style={{
              width: "250px",
            }}
            placeholder="Nhập tên tỉnh"
            data={provinceVN.map((province, index) => ({
              value: index + 1 + "",
              label: province,
            }))}
            onChange={(value) => {
              setProvince(value ? parseInt(value) : undefined);
            }}
            clearable
          />
        </Flex>

        {isLoading ? (
          <Loader />
        ) : data && data.length > 0 ? (
          <Grid mt={30}>
            {data.map((shop, index) => (
              <Grid.Col key={index} span={4}>
                <ShopCard {...shop} phoneNumber={shop.phone_number} />
              </Grid.Col>
            ))}
          </Grid>
        ) : (
          <div
            style={{
              marginTop: "30px",
              textAlign: "center",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            Không có cửa hàng nào
          </div>
        )}
      </Container>
    </Stack>
  );
};
