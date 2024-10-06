"use client";

import { useEffect, useRef, useState } from "react";
import { Group, rem, Box, Text, Image } from "@mantine/core";
import {
  Dropzone,
  DropzoneProps,
  FileRejection,
  FileWithPath,
  MIME_TYPES,
} from "@mantine/dropzone";
import { IconX, IconPhoto, IconUpload } from "@tabler/icons-react";
import classes from "./Style.module.css";
import { uploadToFirebase } from "@/libs/firebase/firebaseConfig";
import { notifications } from "@mantine/notifications";

interface Props extends Omit<DropzoneProps, "onChange" | "onDrop"> {
  onChange: (fileUrl: string) => void;
  error?: string;
  value: string;
}

export type FilePreviewType = {
  preview: string;
} & File;

export function DropzoneImage({ onChange, error, value, ...props }: Props) {
  const openRef = useRef<() => void>(null);
  const [files, setFiles] = useState<FilePreviewType[]>([]);

  const handleDrop = async (files: FileWithPath[]) => {
    setFiles(
      files.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );

    const res = await uploadToFirebase(files[0], (progress: number) => {});

    onChange(res.downloadUrl);
  };

  const handleReject = (files: FileRejection[]) => {
    notifications.show({
      title: "File rejected",
      message: files[0].errors[0].message,
      color: "red",
    });
  };

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onReject={handleReject}
        className={classes.dropzone}
        radius="md"
        accept={[MIME_TYPES.jpeg, MIME_TYPES.png]}
        maxSize={30 * 1024 ** 2}
        {...props}
        onDrop={handleDrop}
      >
        <Group
          justify="center"
          gap="xl"
          mih={220}
          style={{ pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <IconUpload
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-blue-6)",
              }}
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-red-6)",
              }}
              stroke={1.5}
            />
          </Dropzone.Reject>

          <Dropzone.Idle>
            <Box
              style={{
                width: "100%",
                height: "100%",

                maxHeight: rem(240),
                maxWidth: rem(240),

                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {value || files.length > 0 ? (
                <Image
                  src={files?.[0]?.preview || value}
                  alt="preview"
                  style={{
                    maxHeight: rem(240),
                    maxWidth: rem(240),
                    objectFit: "cover",
                  }}
                />
              ) : (
                <IconPhoto
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-dimmed)",
                  }}
                  stroke={1.5}
                />
              )}
            </Box>
          </Dropzone.Idle>
        </Group>
      </Dropzone>

      {error && typeof error == "string" && (
        <Text
          style={{
            color: "#fa5252",
            fontSize: "14px",
            lineHeight: "20px",
            fontWeight: 400,
            marginTop: "6px",
          }}
        >
          {error}
        </Text>
      )}
    </div>
  );
}
