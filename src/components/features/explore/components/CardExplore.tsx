"use client";

import { Button, Card, Flex, Group, Image, Text } from "@mantine/core";
import { IconBubbleText, IconEyeFilled, IconMapPin } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

interface Props {
  image: string;
  title: string;
  description: string;
  comment: number;
  view: number;
  location: string;
  id: number;
}

export const CardExplore = ({
  comment,
  description,
  image,
  location,
  title,
  view,
  id,
}: Props) => {
  return (
    <Link href={`/story/${id}`}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            src={image}
            style={{
              height: 160,
            }}
            alt="Norway"
          />
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
          <Text
            fw={500}
            style={{
              color: "#FFBC2C",
            }}
          >
            {title}
          </Text>
        </Group>

        <Text size="sm" c="dimmed" lineClamp={4}>
          {description}
        </Text>

        <Group mt={20}>
          <Flex align={"center"} gap={4}>
            <IconBubbleText width={12} height={12} />
            <span>{comment} bình luận</span>
          </Flex>
          <Flex align={"center"} gap={4}>
            <IconEyeFilled width={12} height={12} />
            <span>{view} lượt xem</span>
          </Flex>
          <Flex align={"center"} gap={4}>
            <IconMapPin width={12} height={12} />
            <span>{location}</span>
          </Flex>
        </Group>

        <Button
          color="blue"
          fullWidth
          mt="lg"
          radius="md"
          style={{
            backgroundColor: "#FFBC2C",
          }}
        >
          VIEW NOW
        </Button>
      </Card>
    </Link>
  );
};
