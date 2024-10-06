"use client";

import { Box, Image, Input, Stack, Tooltip } from "@mantine/core";
import React from "react";
import BacImg from "@assets/images/map/bac.png";
import TrungImg from "@assets/images/map/trung.png";
import NamImg from "@assets/images/map/nam.png";
import { REGION } from "@/libs/utils/constants";

interface Props {
  region: "NORTH" | "CENTRAL" | "SOUTH";
  setRegion: React.Dispatch<
    React.SetStateAction<"NORTH" | "CENTRAL" | "SOUTH">
  >;
}

export const VietNamMap = ({ region, setRegion }: Props) => {
  const handleClick = (region: "NORTH" | "CENTRAL" | "SOUTH") => {
    setRegion(region);
  };

  return (
    <Stack>
      <Input
        style={{
          width: "300px",
          textAlign: "center",
          marginLeft: "100px",
        }}
        disabled
        value={REGION[region]}
      />

      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
          width: "500px",
          minHeight: "700px",
        }}
      >
        <Tooltip label="Miền Bắc">
          <Image
            src={BacImg.src}
            style={{
              width: "50%",
              position: "absolute",
              top: "0",
              cursor: "pointer",
            }}
            alt="bac"
            onClick={() => handleClick("NORTH")}
          />
        </Tooltip>

        <Tooltip label="Miền Trung">
          <Image
            src={TrungImg.src}
            style={{
              width: "50%",
              position: "absolute",
              top: "20%",
              left: "34%",
              cursor: "pointer",
            }}
            onClick={() => handleClick("CENTRAL")}
            alt="trung"
          />
        </Tooltip>

        <Tooltip label="Miền Nam">
          <Image
            src={NamImg.src}
            style={{
              position: "absolute",
              top: "60%",
              left: "50%",
              cursor: "pointer",
            }}
            onClick={() => handleClick("SOUTH")}
            alt="nam"
          />
        </Tooltip>
      </Box>
    </Stack>
  );
};
