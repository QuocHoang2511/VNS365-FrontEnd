import {
  Container,
  Group,
  ActionIcon,
  rem,
  Image,
  Stack,
  Title,
  Text,
} from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons-react";
import classes from "./Footer.module.css";
import LogoImg from "@assets/images/logo.png";

export function Footer() {
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Image
          src={LogoImg.src}
          alt="logo"
          style={{
            height: 80,
          }}
        />

        <Stack>
          <Title
            order={3}
            style={{
              color: "white",
            }}
          >
            Dịch vụ
          </Title>

          <Stack gap={4}>
            <Text
              style={{
                color: "white",
              }}
            >
              Trang chủ
            </Text>
            <Text
              style={{
                color: "white",
              }}
            >
              Giới thiệu
            </Text>
            <Text
              style={{
                color: "white",
              }}
            >
              Cửa hàng
            </Text>
            <Text
              style={{
                color: "white",
              }}
            >
              Blog
            </Text>
          </Stack>
        </Stack>

        <Stack>
          <Title
            order={3}
            style={{
              color: "white",
            }}
          >
            Flow us
          </Title>

          <Group
            gap={0}
            className={classes.links}
            justify="flex-end"
            wrap="nowrap"
          >
            <ActionIcon size="lg" color="white" variant="subtle">
              <IconBrandTwitter
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon size="lg" color="white" variant="subtle">
              <IconBrandYoutube
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon size="lg" color="white" variant="subtle">
              <IconBrandInstagram
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            </ActionIcon>
          </Group>
        </Stack>
      </Container>
    </div>
  );
}
