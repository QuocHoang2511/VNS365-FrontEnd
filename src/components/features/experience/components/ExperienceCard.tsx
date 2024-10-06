import {
  ActionIcon,
  Avatar,
  Box,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import React from "react";
import LikeSvg from "@assets/svgs/like.svg";
import MessageSvg from "@assets/svgs/message.svg";
import Link from "next/link";
import { IconHeart } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";

interface Props {
  userInfo: any;
  featuredImage: string;
  title: string;
  description: string;
  createdAt: string;
  storyId: number;
  comment: number;
  likes: number;
  interaction: boolean;
}

export const ExperienceCard = ({
  featuredImage,
  title,
  description,
  userInfo,
  createdAt,
  storyId,
  comment,
  likes,
  interaction,
}: Props) => {
  const requestAuth = useAxiosAuth();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (id: number) => {
      await requestAuth.post(`/story/${id}/interaction`, {
        status: !interaction ? "LIKE" : "UNLIKE",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["story"],
      });
    },
  });

  const handleInteraction = () => {
    mutate(storyId);
  };

  return (
    <Stack>
      <Group>
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
          radius="xl"
          size={68}
        />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {userInfo.name}
          </Text>

          <Text c="dimmed" size="xs">
            {userInfo.email}
          </Text>

          <Text c="dimmed" size="xs">
            {createdAt}
          </Text>
        </div>
      </Group>

      <Link href={`/story/${storyId}`}>
        <Box>
          <Image src={featuredImage} alt="food" mah={500} />

          {/* <Flex
          style={{
            marginTop: "12px",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
          gap={12}
        >
          <Image
            src={
              featuredImage
            }
            alt="food"
            style={{
              width: "124px",
            }}
            radius={"sm"}
          />

          <Image
            src={
              featuredImage
            }
            alt="food"
            style={{
              width: "124px",
            }}
            radius={"sm"}
          />

          <Image
            src={
              "https://firebasestorage.googleapis.com/v0/b/file-storage-6ac01.appspot.com/o/vietnam-food%2FSidebar%20(4).png?alt=media&token=a7e6c5fb-1fb1-403a-ad21-717abf11a3de"
            }
            alt="food"
            style={{
              width: "124px",
            }}
            radius={"sm"}
          />
        </Flex> */}
        </Box>

        <Stack
          style={{
            margin: "auto",
            maxWidth: "80%",
            alignItems: "center",
          }}
        >
          <Title
            style={{
              color: "#FFBC2C",
            }}
          >
            {title}
          </Title>

          <Text
            style={{
              textAlign: "center",
            }}
          >
            {description}
          </Text>
        </Stack>
      </Link>

      <Flex align={"center"} justify={"space-between"} gap={24}>
        <Flex align={"center"} gap={24}>
          <Flex align={"center"} gap={12}>
            <Image
              src={LikeSvg.src}
              style={{
                width: "54px",
                height: "54px",
                cursor: "pointer",
              }}
              alt="like"
            />
            <span>{likes || 0}</span>
          </Flex>

          <Flex align={"center"} gap={12}>
            <Image
              src={MessageSvg.src}
              style={{
                width: "54px",
                height: "54px",
                cursor: "pointer",
              }}
              alt="message"
            />
            <span>{comment || 0}</span>
          </Flex>
        </Flex>

        <ActionIcon
          size={42}
          variant={interaction ? "filled" : "default"}
          onClick={() => handleInteraction()}
          color="red"
        >
          <IconHeart style={{ width: rem(24), height: rem(24) }} />
        </ActionIcon>
      </Flex>
    </Stack>
  );
};
