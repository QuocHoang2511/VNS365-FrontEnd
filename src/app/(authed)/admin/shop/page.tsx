import { ShopManagement } from "@/components/features/admin/shop/ShopManagement";
import { Stack, Title } from "@mantine/core";
import React from "react";

const Page = () => {
  return (
    <Stack>
      <Title order={2}>Shop</Title>

      <ShopManagement />
    </Stack>
  );
};

export default Page;
