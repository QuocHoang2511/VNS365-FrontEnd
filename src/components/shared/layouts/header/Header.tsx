"use client";

import {
  ActionIcon,
  Burger,
  Container,
  Flex,
  Group,
  Image,
} from "@mantine/core";
import classes from "./Header.module.css";
import { Auth } from "./components/Auth";
import LogoImg from "@assets/images/logo.png";
import Link from "next/link";
import { IconGardenCart, IconSearch } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

interface Props {
  toggle?: () => void;
  opened?: boolean;
}

const HEADER = [
  {
    title: "Trang chủ",
    href: "/",
  },
  {
    title: "Khám phá",
    href: "/explore",
  },
  {
    title: "Trải nghiệm",
    href: "/experience",
  },
  {
    title: "Cửa hàng",
    href: "/shop",
  },
  {
    title: "Liên hệ",
    href: "/contact",
  },
];

export function Header({ opened, toggle }: Props) {
  const pathname = usePathname();

  return (
    <header className={classes.header}>
      <Container size={"xl"}>
        <Group
          h="100%"
          px="md"
          style={{
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Image
            src={LogoImg.src}
            alt="logo"
            style={{
              height: 60,
            }}
          />

          <Flex
            style={{
              gap: 40,
              alignItems: "center",
            }}
          >
            {HEADER.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                className={`${classes.header__nav_link} ${
                  pathname === item.href ? classes.active : ""
                }`}
              >
                {item.title}
              </Link>
            ))}
          </Flex>

          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Flex
            style={{
              gap: 12,
              alignItems: "center",
            }}
          >
            <ActionIcon variant="transparent" color="gray">
              <IconGardenCart
                style={{ width: "70%", height: "70%" }}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon variant="transparent" color="gray">
              <IconSearch
                style={{ width: "70%", height: "70%" }}
                stroke={1.5}
              />
            </ActionIcon>
            <Auth />
          </Flex>
        </Group>
      </Container>
    </header>
  );
}
