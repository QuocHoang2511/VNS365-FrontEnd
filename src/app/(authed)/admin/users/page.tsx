import { UserManagement } from "@/components/features/admin/users/UserManagement";
import { Stack, Title } from "@mantine/core";
import React from "react";

const Page = () => {
  return (
    <Stack>
      <Title order={2}>Users</Title>

      <UserManagement />
    </Stack>
  );
};

export default Page;
