import { useRef } from "react";
import { IconCloudUpload, IconDownload, IconX } from "@tabler/icons-react";
import { Button, Group, Text, useMantineTheme } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import classes from "../../styles/FileInput.module.css";
type FileInputProps = {
  onFileChange?: (file: File | null) => void;
};

function FileInput({ onFileChange }: FileInputProps) {
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);

  // Accept image files only and upload
  const handleDrop = async (files: File[]) => {
    if (files && files.length > 0) {
      const imageFile = files.find((file) => file.type.startsWith("image/"));
      onFileChange?.(imageFile || null);
    } else {
      onFileChange?.(null);
    }
  };

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onDrop={handleDrop}
        className={classes.dropzone}
        radius="md"
        accept={[
          MIME_TYPES.png,
          MIME_TYPES.jpeg,
          MIME_TYPES.gif,
          MIME_TYPES.svg,
        ]}
        maxSize={5 * 1024 ** 2} // 5MB
      >
        <div style={{ pointerEvents: "none" }}>
          <Group justify="center">
            <Dropzone.Accept>
              <IconDownload
                size={50}
                color={theme.colors.blue[6]}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX size={50} color={theme.colors.red[6]} stroke={1.5} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconCloudUpload
                size={50}
                stroke={1.5}
                className={classes.icon}
              />
            </Dropzone.Idle>
          </Group>

          <Text ta="center" fw={700} fz="lg" mt="xl">
            <Dropzone.Accept>Drop image here</Dropzone.Accept>
            <Dropzone.Reject>Image file less than 5mb</Dropzone.Reject>
            <Dropzone.Idle>Upload product image</Dropzone.Idle>
          </Text>

          <Text className={classes.description}>
            Drag&apos;n&apos;drop image files here to upload. We accept only{" "}
            <i>.png, .jpg, .jpeg, .gif, .svg</i> files less than 5mb in size.
          </Text>
        </div>
      </Dropzone>

      <Button
        className={classes.control}
        size="md"
        radius="xl"
        onClick={() => openRef.current?.()}
      >
        Select image
      </Button>
    </div>
  );
}

export default FileInput;
