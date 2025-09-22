import { useState } from "react";
import { IconChevronRight } from "@tabler/icons-react";
import { Box, Collapse, Group, UnstyledButton } from "@mantine/core";
import classes from "../../styles/LinksGroup.module.css";

interface LinksGroupProps {
  icon?: React.FC<unknown>;
  label: string;
  initiallyOpened?: boolean;
  links?: {
    label: string | React.ReactNode;
    value?: string;
    onClick?: () => void;
  }[];
}

export function LinksGroup({ label, initiallyOpened, links }: LinksGroupProps) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);

  const items = (hasLinks ? links : []).map((link) => (
    <Box
      key={link.value || String(link.label)}
      className={classes.link}
      onClick={link.onClick}
      style={{ cursor: "pointer", padding: "8px 16px" }}
    >
      {link.label}
    </Box>
  ));

  return (
    <>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        className={classes.control}
        style={{ marginBottom: hasLinks && opened ? "10px" : "0" }}
      >
        <Group justify="space-between" gap={0}>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              size={16}
              style={{
                transform: opened ? "rotate(-90deg)" : "none",
                transition: "transform 200ms ease",
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
