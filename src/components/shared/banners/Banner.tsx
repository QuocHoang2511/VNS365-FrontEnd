import {
  BackgroundImage,
  Box,
  Center,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import ExperienceImg from "@assets/images/experience.png";

export const Banner = () => {
  return (
    <Box
      style={{
        position: "relative",
        width: "100%",
        height: "400px",
        overflow: "hidden",
      }}
    >
      <BackgroundImage
        h={"100%"}
        src={ExperienceImg.src}
        style={{
          objectFit: "contain",
        }}
      >
        <Stack p="md" align="center">
          <Title
            style={{
              color: "white",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            Hương Vị Việt Nam
          </Title>

          <Text
            c="white"
            style={{
              maxWidth: "1100px",
              textAlign: "center",
            }}
          >
            Duyệt qua hàng ngàn công thức nấu ăn đa dạng, từ món ăn gia đình đến
            các món ăn đặc sản vùng miền hấp dẫn. <br />
            Tìm kiếm công thức theo nguyên liệu, theo chủ đề, theo dịp lễ
            Tết,... một cách dễ dàng và nhanh chóng. <br />
            Xem video hướng dẫn nấu ăn chi tiết, trực quan, giúp bạn dễ dàng
            thực hiện ngay cả khi bạn mới bắt đầu.
            <br /> Tham gia cộng đồng yêu bếp, chia sẻ kinh nghiệm nấu nướng và
            học hỏi những bí quyết từ các đầu bếp tài năng. <br />
            Mua sắm nguyên liệu nấu ăn tươi ngon, chất lượng với giá cả cạnh
            tranh.
          </Text>
        </Stack>
      </BackgroundImage>
    </Box>
  );
};
