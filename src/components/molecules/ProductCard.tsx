import {
  Card,
  Title,
  AspectRatio,
  Center,
  Group,
  ActionIcon,
  Image,
  Text,
} from "@mantine/core";
import {
  IconEye,
  IconHeart,
  IconShoppingCart,
  IconTrash,
} from "@tabler/icons-react";
import { useNavigate } from "react-router";

type CardPropType = {
  id: string | number;
  style?: React.CSSProperties;
  img: React.ReactNode;
  brand: string;
  title: string;
  description: string;
  price: number;
  showDelete?: boolean;
  onDelete?: () => void;
};

function ProductCard({
  id,
  style,
  img,
  brand,
  title,
  description,
  price,
  showDelete = false,
  onDelete,
}: CardPropType) {
  const navigate = useNavigate();
  return (
    <>
      <Card p="md" radius="sm" style={style} bg={"#F9FBFC"}>
        <Title order={6} ta={"right"}>
          {brand}
        </Title>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <AspectRatio flex="0 0 250px">
            <Image src={img} radius="md" />
          </AspectRatio>
        </div>

        <Center mt={10}>
          <Text fw={600} size="md" ta={"center"}>
            {" "}
            {title}
          </Text>
        </Center>

        <Center mt={10}>
          <Text fw={400} size="md" ta={"center"}>
            {description}
          </Text>
        </Center>
        <Center mt={10}>
          <Text fw={300} size="md">
            ${price}
          </Text>
        </Center>

        <Center mt={10}>
          <Group>
            <ActionIcon
              variant="light"
              onClick={(event) => event.preventDefault()}
            >
              <IconShoppingCart
                style={{ width: "70%", height: "70%" }}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon
              variant="light"
              onClick={(event) => event.preventDefault()}
            >
              <IconHeart style={{ width: "70%", height: "70%" }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon
              variant="light"
              onClick={() => navigate(`/product/${id}`)}
            >
              <IconEye style={{ width: "70%", height: "70%" }} stroke={1.5} />
            </ActionIcon>
            {showDelete && (
              <ActionIcon
                variant="light"
                color="red"
                onClick={(event) => {
                  event.preventDefault();
                  if (onDelete) onDelete();
                }}
              >
                <IconTrash
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
            )}
          </Group>
        </Center>
      </Card>
    </>
  );
}

export default ProductCard;
