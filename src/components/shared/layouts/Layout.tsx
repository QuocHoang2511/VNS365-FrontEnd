"use client";

import { Header } from "@/components/shared/layouts/header";
import { MainPaper } from "@/components/shared/layouts/main-paper";
import { useDisclosure } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import { Footer } from "./footer/Footer";

interface LayoutProps {
  children: React.ReactNode;
  role: string;
}

const Layout = ({ children, role }: LayoutProps) => {
  const [opened, { toggle }] = useDisclosure(false);
  const { status } = useSession();

  if (status == "loading") {
    return null;
  }

  return (
    <>
      <Header toggle={toggle} opened={opened} />
      <div id="primary" className="content-area">
        <main id="main" className="site-main mt-[0px]" role="main">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
};

export { Layout };
