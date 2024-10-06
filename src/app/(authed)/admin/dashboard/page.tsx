import { Dashboard } from "@/components/features/admin/dashboard";
import { Stack, Title } from "@mantine/core";
import React from "react";

const Page = () => {
  return (
    <Stack>
      <Title order={2}>Dashboard</Title>

      <Dashboard />
    </Stack>
  );
};

export default Page;
