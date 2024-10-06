"use client";

import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { Card, Grid, Loader, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface IDashboard {
  totalUsers: number;
  totalAdmins: number;
  totalAccounts: number;
  totalStory: number;
}

export const Dashboard = () => {
  const requestAuth = useAxiosAuth();

  const { data, isLoading } = useQuery<IDashboard>({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const response = await requestAuth.get("/admin/dashboard");

      return response.data;
    },
  });

  console.log(data);

  if (isLoading) return <Loader color="blue" />;

  return (
    <Grid>
      <Grid.Col
        span={{
          xs: 12,
          md: 6,
          lg: 3,
        }}
      >
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} size="sm" c="dimmed" mb={16}>
            Total Accounts
          </Title>

          <Text
            style={{
              fontSize: 24,
              fontWeight: 500,
            }}
          >
            {data?.totalAccounts}
          </Text>
        </Card>
      </Grid.Col>

      <Grid.Col
        span={{
          xs: 12,
          md: 6,
          lg: 3,
        }}
      >
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} size="sm" c="dimmed" mb={16}>
            Admins
          </Title>

          <Text
            style={{
              fontSize: 24,
              fontWeight: 500,
            }}
          >
            {data?.totalAdmins}
          </Text>
        </Card>
      </Grid.Col>

      <Grid.Col
        span={{
          xs: 12,
          md: 6,
          lg: 3,
        }}
      >
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} size="sm" c="dimmed" mb={16}>
            Users
          </Title>

          <Text
            style={{
              fontSize: 24,
              fontWeight: 500,
            }}
          >
            {data?.totalUsers}
          </Text>
        </Card>
      </Grid.Col>

      <Grid.Col
        span={{
          xs: 12,
          md: 6,
          lg: 3,
        }}
      >
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} size="sm" c="dimmed" mb={16}>
            Post
          </Title>

          <Text
            style={{
              fontSize: 24,
              fontWeight: 500,
            }}
          >
            {data?.totalStory}
          </Text>
        </Card>
      </Grid.Col>
    </Grid>
  );
};
