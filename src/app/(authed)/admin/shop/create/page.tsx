"use client";

import { ShopForm } from "@/components/features/admin/shop/components/ShopForm";
import { Container, Stack, Title } from "@mantine/core";
import React from "react";

const Page = () => {
  return (
    <Container size="lg">
      <Stack
        style={{
          padding: "16px 0",
        }}
      >
        <Title>Tạo mới nhà hàng</Title>

        <ShopForm />
      </Stack>
    </Container>
  );
};

export default Page;
