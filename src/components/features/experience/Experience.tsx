"use client";

import { Banner } from "@/components/shared/banners/Banner";
import {
  Box,
  Button,
  Container,
  Flex,
  Loader,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import React from "react";
import { ExperienceCard } from "./components/ExperienceCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { useDebouncedState } from "@mantine/hooks";
import { IStory } from "@/libs/types/story";

export const Experience = () => {
  const request = useAxiosAuth();

  const { data: sessions } = useSession();
  const router = useRouter();
  const [search, setSearch] = useDebouncedState("", 500);
  const [region, setRegion] = React.useState<"NORTH" | "CENTRAL" | "SOUTH">();

  const { data: storyData, isLoading } = useQuery<IStory[]>({
    queryKey: ["story", search, region],
    queryFn: async () => {
      const res = await request.get("/story", {
        params: {
          name: search,
          region,
        },
      });
      return res.data.data;
    },
  });

  return (
    <Stack
      mb={30}
      style={{
        minHeight: "80vh",
      }}
    >
      <Banner />
      <Container size="lg">
        <Flex justify={"space-between"}>
          <Flex gap={12}>
            <TextInput
              style={{
                width: "250px",
              }}
              placeholder="Nhập món ăn tìm kiếm"
              onChange={(event) => setSearch(event.currentTarget.value)}
            />
            <Select
              style={{
                width: "250px",
              }}
              placeholder="Chọn vùng miền"
              data={[
                { label: "Miền Bắc", value: "NORTH" },
                { label: "Miền Trung", value: "CENTRAL" },
                { label: "Miền Nam", value: "SOUTH" },
              ]}
              onChange={(value) =>
                setRegion(value as "NORTH" | "CENTRAL" | "SOUTH")
              }
            />
          </Flex>

          {sessions?.user ? (
            <Button ml={30} onClick={() => router.push("story/create")}>
              Đăng bài
            </Button>
          ) : (
            <></>
          )}
        </Flex>

        <Stack mt={30}>
          {isLoading ? (
            <Loader color="blue" />
          ) : storyData && storyData?.length > 0 ? (
            storyData?.map((story, index) => (
              <Box
                key={index}
                style={{
                  width: "800px",
                  marginBottom: "20px",
                }}
              >
                <ExperienceCard
                  userInfo={{
                    name: story.user.name,
                    email: story.user.email,
                  }}
                  featuredImage={story.featured_image}
                  title={story.title}
                  description={story.description}
                  comment={story?.comments?.length}
                  likes={story._count.userLikeStory}
                  createdAt={story.created_at}
                  storyId={story.id}
                  interaction={story.userLikeStory.some(
                    (item) => item.user_id === sessions?.user?.id
                  )}
                />
              </Box>
            ))
          ) : (
            <div
              style={{
                textAlign: "center",
                fontSize: "20px",
                color: "#666",
              }}
            >
              Không có bài viết được tìm thấy
            </div>
          )}
        </Stack>
      </Container>
    </Stack>
  );
};
