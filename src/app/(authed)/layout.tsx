import { Layout } from "@/components/shared/layouts/Layout";
import { getRole } from "@/libs/utils/authUtils";

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutAdmin = async ({ children }: LayoutProps) => {
  const role = await getRole();

  return <Layout role={role ?? ""}>{children}</Layout>;
};

export default LayoutAdmin;
