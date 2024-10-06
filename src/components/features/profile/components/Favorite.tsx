import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { IStory } from "@/libs/types/story";
import { Grid, Loader } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { CardExplore } from "../../explore/components/CardExplore";
import { REGION } from "@/libs/utils/constants";

export const Favorite = () => {
  const requestAuth = useAxiosAuth();

  const { data, isLoading } = useQuery<IStory[]>({
    queryKey: ["favorite"],
    queryFn: async () => {
      const response = await requestAuth.get("/auth/favorites");
      return response.data;
    },
  });

  if (isLoading) return <Loader />;

  return (
    <Grid>
      {data && data.length > 0
        ? data.map((item, index) => (
            <Grid.Col
              span={{
                base: 6,
              }}
              key={index}
            >
              <CardExplore
                key={index}
                id={item.id}
                comment={item?._count?.comments}
                description={item.description}
                image={item.featured_image}
                location={REGION[item.region.name as keyof typeof REGION]}
                title={item.title}
                view={item.views}
              />
            </Grid.Col>
          ))
        : null}
    </Grid>
  );
};
