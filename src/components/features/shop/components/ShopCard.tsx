import React from "react";
import { Card, Image, Text, Group, Stack } from "@mantine/core";

interface Props {
  name: string;
  description: string;
  address: string;
  phoneNumber: string;
  image: string;
}

export const ShopCard = ({
  name,
  description,
  address,
  phoneNumber,
  image,
}: Props) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder h={"100%"}>
      <Card.Section>
        <Image
          src={image}
          alt="Norway"
          style={{
            height: "160px",
          }}
        />
      </Card.Section>

      <Stack gap={12}>
        <Group justify="space-between" mt="md">
          <Text fw={500}>{name}</Text>
        </Group>

        <Text size="sm" c="dimmed" lineClamp={3}>
          {description}
        </Text>

        <Text size="sm" fw={"bold"}>
          {address}
        </Text>

        <Text size="sm" fw={"bold"}>
          {phoneNumber}
        </Text>
      </Stack>
    </Card>
  );
};
