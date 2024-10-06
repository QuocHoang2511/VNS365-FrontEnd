"use client";

import classes from "./Navbar.module.css";
import { Transition } from "@mantine/core";
import { LinksGroup } from "../navbar-links-group/NavbarLinksGroup";
import { useMemo } from "react";

const adminSideBar = [
  {
    label: "Trang chủ",
    link: "/admin/dashboard",
  },
  {
    label: "Người dùng",
    link: "/admin/users",
  },
  {
    label: "Câu chuyện",
    link: "/admin/story",
  },
  {
    label: "Nhà hàng",
    link: "/admin/shop",
  },
];

interface Props {
  toggle?: () => void;
  opened?: boolean;
}

export const Navbar = ({ opened }: Props) => {
  const links = useMemo(() => {
    return adminSideBar.map((item) => (
      <LinksGroup {...item} key={item.label} />
    ));
  }, []);

  return (
    <>
      <nav className={classes.navbar__desktop}>
        <div className={classes.linksInner}>{links}</div>
      </nav>

      <Transition
        transition="pop-top-left"
        duration={200}
        mounted={!!opened}
        keepMounted={true}
      >
        {(styles) => (
          <nav style={styles}>
            <div className={classes.linksInner}>{links}</div>
          </nav>
        )}
      </Transition>
    </>
  );
};
