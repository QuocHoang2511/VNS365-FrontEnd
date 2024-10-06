"use client";

import { Box, Button, Flex, Stack, Text, Title } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import { useSession } from "next-auth/react";
import React from "react";

export const ModalConfirmPay = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{
  modalBody: string;
  paymentMethod: "CASH" | "PAYPAL";
  onConfirm: () => void;
}>) => {
  const { data } = useSession();

  return (
    <Stack>
      <Stack>
        <Title order={5}>Vị trí làm việc</Title>
        <Box
          style={{
            padding: "16px",
            borderRadius: 4,
            border: "1px solid #E4E7EB",
          }}
        >
          <Text fw={700}>{data?.user?.name}</Text>
          <Text>Số điện thoại: {data?.user?.phone_number}</Text>

          <Text>Chi tiết địa chỉ: {data?.user?.address}</Text>
        </Box>
      </Stack>

      <Stack>
        <Title order={5}>Thông tin công việc</Title>
        {innerProps.modalBody}
      </Stack>

      <Stack>
        <Title order={5}>Phương thức thanh toán</Title>
        {innerProps.paymentMethod === "CASH" ? (
          <Text>Tiền mặt</Text>
        ) : (
          <Text>Paypal</Text>
        )}
      </Stack>

      <Flex flex={1} gap={16}>
        <Button
          color="red"
          onClick={() => context.closeModal(id)}
          style={{
            width: "100%",
          }}
        >
          Đóng
        </Button>
        <Button
          style={{
            width: "100%",
          }}
          onClick={innerProps.onConfirm}
        >
          Thanh toán
        </Button>
      </Flex>
    </Stack>
  );
};
