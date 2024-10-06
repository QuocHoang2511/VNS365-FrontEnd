import {
  Flex,
  Text,
  Switch as MantineSwitch,
  SwitchProps,
} from "@mantine/core";
import React from "react";

interface Props extends SwitchProps {
  label: string;
}

export const Switch = ({ label, ...props }: Props) => {
  return (
    <>
      <Flex direction={"column"} w={"fit-content"}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "#212529",
          }}
        >
          {label}
        </Text>

        <MantineSwitch onLabel="ON" offLabel="OFF" size="lg" {...props} />
      </Flex>
    </>
  );
};
