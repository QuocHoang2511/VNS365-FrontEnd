"use client";

import { Box, Center, Grid, Image, Loader, Stack, Title } from "@mantine/core";
import React from "react";
import ExploreImg from "@assets/images/explore-banner.png";
import CTAImg from "@assets/images/CTA.png";
import { Filter } from "./components/Filter";
import { VietNamMap } from "./components/VietNamMap";

import { CardExplore } from "./components/CardExplore";
import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { IStory } from "@/libs/types/story";
import { useDebouncedState } from "@mantine/hooks";
import { REGION } from "@/libs/utils/constants";

export const Explore = () => {
  const request = useAxiosAuth();
  const [region, setRegion] = React.useState<"NORTH" | "CENTRAL" | "SOUTH">(
    "NORTH"
  );

  const [search, setSearch] = useDebouncedState("", 500);

  const { data, isLoading } = useQuery<IStory[]>({
    queryKey: ["story", region, search],
    queryFn: async () => {
      const res = await request.get("/story", {
        params: {
          region,
          name: search,
        },
      });

      return res.data.data;
    },
  });

  return (
    <Box>
      <Stack mb={30}>
        <Box
          style={{
            paddingTop: "30%",
            position: "relative",
            backgroundColor: "#ffca0f",
          }}
        >
          <Title
            style={{
              color: "white",
              position: "absolute",
              top: "30%",
              left: "20%",
              fontWeight: 700,
              fontSize: "2.5rem",
            }}
          >
            Khám phá
          </Title>

          <Image
            style={{
              position: "absolute",
              top: "50%",
              right: "20%",
              width: "auto",
              height: "80%",
              objectFit: "contain",
              transform: "translateY(-50%)",
            }}
            src={ExploreImg.src}
            alt="explore"
          />
        </Box>

        <Box
          style={{
            maxWidth: "1400px",
          }}
          mt={24}
        >
          <Grid>
            <Grid.Col span={{ base: 8 }}>
              <VietNamMap region={region} setRegion={setRegion} />
            </Grid.Col>

            <Grid.Col span={{ base: 4 }}>
              <Filter setSearch={setSearch} />

              {isLoading ? (
                <Loader color="blue" />
              ) : data && data?.length > 0 ? (
                <Stack mt={24}>
                  {data.map((item, index) => (
                    <CardExplore
                      key={index}
                      id={item.id}
                      comment={item?.comments?.length}
                      description={item.description}
                      image={item.featured_image}
                      location={REGION[item.region.name as keyof typeof REGION]}
                      title={item.title}
                      view={item.views}
                    />
                  ))}
                </Stack>
              ) : (
                <Center mt={12}>Không có dữ liệu</Center>
              )}
            </Grid.Col>
          </Grid>
        </Box>
      </Stack>

      <Image
        src={CTAImg.src}
        alt="1"
        style={{
          marginTop: "240px",
          display: "block",
          marginBottom: "-6px",
        }}
      />
    </Box>
  );
};
