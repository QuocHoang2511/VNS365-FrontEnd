"use client";

import {
  Box,
  Container,
  Flex,
  Image,
  Loader,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React, { useEffect } from "react";
import QuoteImg from "@assets/images/Quote.png";

import { Comment } from "./components/comment/Comment";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { request } from "@/libs/request";

export const Story = () => {
  const params = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["story", params.id],
    queryFn: async () => {
      const res = await request.get(`/story/${params.id}`);
      return res.data;
    },
    enabled: !!params.id,
  });

  if (isLoading) {
    return <Loader color="blue" />;
  }

  return (
    <Box mt={30} mb={30}>
      <Container>
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
        <Title
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Bình luận
        </Title>

        <Comment storyId={params.id as string} />
      </Container>
    </Box>
  );
};
