"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Group,
  Image,
  Loader,
  Stack,
  Title,
} from "@mantine/core";
import React from "react";
import QuoteImg from "@assets/images/Quote.png";

import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { request } from "@/libs/request";
import { Status } from "@/libs/utils/constants";
import { IStory } from "@/libs/types/story";
import { Comment } from "./comment/Comment";

export const StoryPreview = () => {
  const router = useRouter();
  const params = useParams();

  const { data, isLoading } = useQuery<IStory>({
    queryKey: ["story", params.id],
    queryFn: async () => {
      const res = await request.get(`admin/story/${params.id}`);
      return res.data;
    },
    enabled: !!params.id,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      status,
    }: {
      status: Status.APPROVED | Status.REJECTED;
    }) => {
      const res = await request.patch(`admin/story/${params.id}/status`, {
        status: status,
      });
      return res.data;
    },
    onSuccess: () => {
      router.back();
    },
  });

  const handleApprove = () => {
    mutate({ status: Status.APPROVED });
  };

  const handleReject = () => {
    mutate({ status: Status.REJECTED });
  };

  if (isLoading) {
    return <Loader color="blue" />;
  }

  return (
    <Stack>
      <Group align="center">
        <Title order={2}>Story Preview</Title>

        {data?.status === Status.PENDING && (
          <Flex gap={16}>
            <Button
              onClick={handleApprove}
              loading={isPending}
              disabled={isPending}
            >
              Phê duyệt
            </Button>
            <Button
              color="red"
              onClick={handleReject}
              loading={isPending}
              disabled={isPending}
            >
              Từ chối
            </Button>
          </Flex>
        )}
      </Group>

      {data ? (
        <Box mt={30} mb={30}>
          <Container size={"lg"}>
            <Stack gap={40}>
              <Title
                style={{
                  color: "#FFBC2C",
                  textAlign: "center",
                }}
              >
                {data.title}
              </Title>

              <Box
                dangerouslySetInnerHTML={{
                  __html: data.content,
                }}
                style={{
                  marginTop: "24px",
                  padding: "4% 5%",

                  "& a": {
                    color: "#006121",
                    textDecoration: "underline",
                  },

                  "& img": {
                    maxWidth: "100%",
                  },

                  "& ul": {
                    display: "block",
                    marginBlockStart: "1em",
                    marginBlockEnd: "1em",
                    marginInlineStart: "0px",
                    marginInlineEnd: "0px",
                    paddingInlineStart: "40px",
                    listStyleType: "decimal",
                  },

                  "& ol": {
                    display: "block",
                    marginBlockStart: "1em",
                    marginBlockEnd: "1em",
                    marginInlineStart: "0px",
                    marginInlineEnd: "0px",
                    paddingInlineStart: "40px",
                    listStyleType: "decimal",
                  },

                  "& blockquote": {
                    borderLeft: "2px solid #ccc",
                    marginLeft: "1.5rem",
                    paddingLeft: "1rem",
                  },

                  "& tr": {
                    borderColor: "transparent !important",
                  },

                  "& td": {
                    borderColor: "transparent !important",
                    padding: "0.5rem 0.75rem !important",

                    "& img": {
                      width: "100% !important",
                      height: "auto !important",
                    },
                  },
                }}
              />
            </Stack>
          </Container>

          <Image
            src={QuoteImg.src}
            alt="quote"
            style={{
              marginTop: "40px",
              display: "block",
              marginBottom: "40px",
              maxHeight: "400px",
            }}
          />

          <Container>
            <Stack>
              <Box
                dangerouslySetInnerHTML={{
                  __html: data.cooking_method,
                }}
                style={{
                  marginTop: "24px",
                  padding: "4% 5%",

                  "& a": {
                    color: "#006121",
                    textDecoration: "underline",
                  },

                  "& img": {
                    maxWidth: "100%",
                  },

                  "& ul": {
                    display: "block",
                    marginBlockStart: "1em",
                    marginBlockEnd: "1em",
                    marginInlineStart: "0px",
                    marginInlineEnd: "0px",
                    paddingInlineStart: "40px",
                    listStyleType: "decimal",
                  },

                  "& ol": {
                    display: "block",
                    marginBlockStart: "1em",
                    marginBlockEnd: "1em",
                    marginInlineStart: "0px",
                    marginInlineEnd: "0px",
                    paddingInlineStart: "40px",
                    listStyleType: "decimal",
                  },

                  "& blockquote": {
                    borderLeft: "2px solid #ccc",
                    marginLeft: "1.5rem",
                    paddingLeft: "1rem",
                  },

                  "& tr": {
                    borderColor: "transparent !important",
                  },

                  "& td": {
                    borderColor: "transparent !important",
                    padding: "0.5rem 0.75rem !important",

                    "& img": {
                      width: "100% !important",
                      height: "auto !important",
                    },
                  },
                }}
              />
            </Stack>
          </Container>

          <Container mt={30}>
            <Comment storyId={params.id as string} />
          </Container>
        </Box>
      ) : null}
    </Stack>
  );
};
