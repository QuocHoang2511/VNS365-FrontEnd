import { request } from "@/libs/request";
import { Grid, Loader, Stack, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { CardExplore } from "../../explore/components/CardExplore";
import { IStory } from "@/libs/types/story";
import { REGION } from "@/libs/utils/constants";

export const ListNews = () => {
  const { data, isLoading } = useQuery<IStory[]>({
    queryKey: ["story"],
    queryFn: async () => {
      const res = await request.get("/story");

      return res.data.data;
    },
  });

  return (
    <>
      {isLoading ? (
        <Loader color="blue" />
      ) : data && data?.length > 0 ? (
        <Stack>
          <Title>Danh sách bài viết</Title>

          <Grid>
            {data.map((item, index) => (
              <Grid.Col
                span={{
                  xs: 12,
                  sm: 6,
                  md: 4,
                }}
                style={{
                  height: "100%",
                }}
                key={item.id}
              >
                <CardExplore
                  id={item.id}
                  comment={item._count.comments}
                  description={item.description}
                  image={item.featured_image}
                  location={REGION[item.region.name as keyof typeof REGION]}
                  title={item.title}
                  view={item.views}
                />
              </Grid.Col>
            ))}
          </Grid>
        </Stack>
      ) : null}
    </>
  );
};
