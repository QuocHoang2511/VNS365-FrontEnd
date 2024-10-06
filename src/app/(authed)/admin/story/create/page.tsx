"use client";

import { StoryForm } from "@/components/features/story/components/form/StoryForm";
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
        <Title>Tạo mới bài viết</Title>

        <StoryForm />
      </Stack>
    </Container>
  );
};

export default Page;
