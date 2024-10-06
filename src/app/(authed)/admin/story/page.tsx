import { StoryManagement } from "@/components/features/admin/story/StoryManagement";
import { Stack, Title } from "@mantine/core";
import React from "react";

const Page = () => {
  return (
    <Stack>
      <Title order={2}>Post</Title>

      <StoryManagement />
    </Stack>
  );
};

export default Page;
