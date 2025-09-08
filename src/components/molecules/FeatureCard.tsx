import React from "react";
import {
  Card,
  AspectRatio,
  Text,
  Image,
  Title,
  type CardProps,
} from "@mantine/core";
import AppButton from "../atoms/AppButton";
import { IconArrowUpRight } from "@tabler/icons-react";
import { useNavigate } from "react-router";

type CardPropType = CardProps & {
  style?: React.CSSProperties;
  img: React.ReactNode;
};

function FeatureCard({ style, img }: CardPropType) {
  const navigate = useNavigate();
  return (
    <>
      <Card p="md" radius="sm" style={style}>
        <Title order={6}>Macbook</Title>
        <Text size="md" fw={300} mb={10}>
          Up to 50% off laptop
        </Text>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <AspectRatio ratio={1} flex="0 0 250px">
            <Image src={img} radius="md" />
          </AspectRatio>
        </div>

        <span>
          <AppButton
            variant="transparent"
            c={"black"}
            size="md"
            ta={"start"}
            style={{ textAlign: "left", justifyContent: "flex-start" }}
            mt={40}
            onClick={() => navigate("/product")}
          >
            Shop Now
            <IconArrowUpRight size={16} />
          </AppButton>
        </span>
      </Card>
    </>
  );
}

export default FeatureCard;
