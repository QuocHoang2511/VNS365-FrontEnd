"use client";

import React from "react";

import { SliderBanner } from "./components/SliderBanner";
import { Container, Stack } from "@mantine/core";
import { ListNews } from "./components/ListNews";

function Home() {
  return (
    <Container
      size={"xl"}
      mt={30}
      mb={30}
      style={{
        minHeight: "70vh",
      }}
    >
      <Stack gap={40}>
        <SliderBanner />

        <ListNews />
      </Stack>
    </Container>
  );
}

export { Home };
