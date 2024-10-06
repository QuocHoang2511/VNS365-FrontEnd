import { MainPaper } from "@/components/shared/layouts/main-paper";
import { Navbar } from "@/components/shared/layouts/navbar/NavBar";
import { getRole } from "@/libs/utils/authUtils";
import { Role } from "@/libs/utils/constants";
import { Box, Flex } from "@mantine/core";

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutAdmin = async ({ children }: LayoutProps) => {
  const role = await getRole();

  if (role !== Role["ADMIN"]) {
    return (
      <div
        style={{
          minHeight: "100vh",
        }}
      >
        Không có quyền truy cập, trang này chỉ dành cho ADMIN
      </div>
    );
  }

  return (
    <Flex gap={30}>
      <Box
        style={{
          width: "250px",
          paddingTop: "20px",
          borderRight: "1px solid #e1e1e1",
        }}
      >
        <Navbar />
      </Box>
      <Box
        mt={24}
        style={{
          width: "100%",
          minHeight: "100vh",
          padding: "20px",
          overflow: "hidden",
        }}
      >
        {children}
      </Box>
    </Flex>
  );
};

export default LayoutAdmin;
