"use client";

import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { request } from "@/libs/request";
import {
  Avatar,
  Button,
  Flex,
  Loader,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Props {
  storyId: string;
}

export const Comment = ({ storyId }: Props) => {
  const { data: sessions } = useSession();
  const [message, setMessage] = React.useState("");
  const requestAuth = useAxiosAuth();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["comment", storyId],
    queryFn: async () => {
      const res = await request.get(`/comment/${storyId}/story`);
      return res.data;
    },

    enabled: !!storyId,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => {
      const res = await requestAuth.post("/comment", {
        comment_content: data,
        story_id: storyId,
      });
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

  const handleComment = () => {
    if (!message) {
      return;
    }

    mutate(message);
    setMessage("");
  };

  if (isLoading) {
    return <Loader color="blue" />;
  }

  return (
    <div>
      <Stack mb={30}>
        {data.map((item: any) => (
          <CommentItem
            key={item.id}
            user={{
              name: item.user.name,
            }}
            comment_content={item.comment_content}
            comment_timestamp={item.comment_timestamp}
          />
        ))}
      </Stack>

      {sessions?.user ? (
        <>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            label="Viết bình luận"
            autosize
            minRows={2}
            maxRows={6}
          />
          <Button
            style={{
              backgroundColor: "#5E6600",
              marginTop: "12px",
            }}
            onClick={handleComment}
            loading={isPending}
          >
            Gửi
          </Button>
        </>
      ) : (
        <Button onClick={() => router.push("/login")}>
          Bạn cần đăng nhập để bình luận
        </Button>
      )}
    </div>
  );
};

interface CommentItemProps {
  user: {
    name: string;
  };
  comment_content: string;
  comment_timestamp: string;
}

const CommentItem = ({
  user,
  comment_content,
  comment_timestamp,
}: CommentItemProps) => {
  return (
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
  );
};
