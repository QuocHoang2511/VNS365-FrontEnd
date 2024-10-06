/* eslint-disable @next/next/no-img-element */
"use client";

import { ActionIcon, Flex, NumberFormatter, Stack, Text } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import classes from "./Style.module.css";

interface Props {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

export const ProductCard: React.FC<Props> = ({ id, name, imageUrl, price }) => {
  return (
    <Stack
      style={{
        height: "100%",
        gap: "12px",
        position: "relative",
      }}
    >
      <Link
        href={`/product/${id}`}
        style={{
          overflow: "hidden",
          position: "relative",
          paddingTop: "100%",
        }}
      >
        <img
          alt="product"
          src={imageUrl}
          style={{
            display: "block",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Link>

      <Stack
        style={{
          gap: "6px",
        }}
      >
        <Text className={classes.name} lineClamp={2}>
          {name}
        </Text>
        <NumberFormatter
          suffix="VNĐ"
          value={price}
          thousandSeparator
          className={classes.price}
        />

        <Flex
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Stack gap={1}>
            <Text style={{ fontSize: "14px", color: "#0DB866" }}>Còn hàng</Text>
            {/* <Text style={{ fontSize: "14px", color: "#A3A3A3" }}>Quà tặng</Text> */}
          </Stack>

          <div></div>
          <ActionIcon
            variant="gradient"
            size="lg"
            aria-label="Gradient action icon"
            gradient={{ from: "blue", to: "cyan", deg: 90 }}
            onClick={() => {}}
          >
            <IconShoppingCart />
          </ActionIcon>
        </Flex>
      </Stack>
    </Stack>
  );
};
