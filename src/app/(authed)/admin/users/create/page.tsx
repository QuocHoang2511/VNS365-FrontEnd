import { UserForm } from "@/components/features/admin/users/components/UserForm";
import { Stack, Title } from "@mantine/core";
import React from "react";

const Page = () => {
  return (
    <Stack>
      <Title order={1}>Thêm người dùng</Title>

      <UserForm />
    </Stack>
  );
};

export default Page;
