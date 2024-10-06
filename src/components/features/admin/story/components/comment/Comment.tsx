"use client";

import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { request } from "@/libs/request";
import {
  ActionIcon,
  Avatar,
  Flex,
  Loader,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { IconTrash } from "@tabler/icons-react";

interface Props {
  storyId: string;
}

export const Comment = ({ storyId }: Props) => {
  const requestAuth = useAxiosAuth();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["comment", storyId],
    queryFn: async () => {
      const res = await request.get(`/comment/${storyId}/story`);
      return res.data;
    },

    enabled: !!storyId,
  });

  const { mutate } = useMutation({
    mutationFn: async ({ commentId }: { commentId: number }) => {
      const res = await requestAuth.delete("/comment/" + commentId);
      return res.data;
    },
    onError: () => {
      toast.error("Đã có lỗi xảy ra");
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comment", storyId],
      });
    },
  });

  if (isLoading) {
    return <Loader color="blue" />;
  }

  const handleDelete = (commentId: number) => {
    mutate({ commentId });
  };

  return (
    <div>
      {data && data.length > 0 ? (
        <>
          <Title
            style={{
              textAlign: "center",
              marginBottom: "30px",
            }}
          >
            Bình luận
          </Title>

          <Stack mb={30}>
            {data.map((item: any) => (
              <CommentItem
                key={item.id}
                user={{
                  name: item.user.name,
                }}
                comment_content={item.comment_content}
                comment_timestamp={item.comment_timestamp}
                handleDeleteComment={() => handleDelete(item.id)}
              />
            ))}
          </Stack>
        </>
      ) : null}
    </div>
  );
};

interface CommentItemProps {
  user: {
    name: string;
  };
  comment_content: string;
  comment_timestamp: string;
  handleDeleteComment: () => void;
}

const CommentItem = ({
  user,
  comment_content,
  comment_timestamp,
  handleDeleteComment,
}: CommentItemProps) => {
  return (
    <Flex justify={"space-between"}>
      <Flex gap={12}>
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
          radius="xl"
          size={40}
        />

        <Stack gap={12}>
          <Stack gap={4}>
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              {user.name}
            </Text>
            <Text
              color="gray"
              style={{
                fontSize: 14,
              }}
            >
              {format(new Date(comment_timestamp), "dd-MM-yyyy HH:mm:ss")}
            </Text>
          </Stack>
          <Text>{comment_content}</Text>
        </Stack>
      </Flex>

      <ActionIcon color="red" onClick={handleDeleteComment} variant="filled">
        <IconTrash stroke={1.5} />
      </ActionIcon>
    </Flex>
  );
};
