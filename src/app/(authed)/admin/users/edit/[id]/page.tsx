import { UserManagement } from "@/components/features/admin/users/UserManagement";
import { UserForm } from "@/components/features/admin/users/components/UserForm";
import { Stack, Title } from "@mantine/core";
import React from "react";

const Page = () => {
  return (
    <Stack>
      <Title order={1}>Sửa người dùng</Title>

      <UserForm />
    </Stack>
  );
};

export default Page;
