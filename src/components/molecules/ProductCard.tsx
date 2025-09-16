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
import { useAuth } from "../../utils/contexts/authenticationContext";
import { useWishlist } from "../../utils/contexts/wishlistContext";
import { useCart } from "../../utils/contexts/cartContext";

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
  const { user } = useAuth();
  const { isFavorite, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleToggleFavorite = (event: React.MouseEvent) => {
    event.preventDefault();
    if (isFavorite(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }
  };

  const handleAddToCart = (event: React.MouseEvent) => {
    event.preventDefault();
    addToCart({
      id,
      quantity: 1,
      img,
      brand,
      title,
      description,
      price,
    });
  };

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
              onClick={handleAddToCart}
              aria-label="Add to cart"
            >
              <IconShoppingCart
                style={{ width: "70%", height: "70%" }}
                stroke={1.5}
              />
            </ActionIcon>
            {/* Wishlist/Favorite only for non-admin users */}
            {user && !user.isAdmin && (
              <ActionIcon
                variant={isFavorite(id) ? "filled" : "light"}
                color={isFavorite(id) ? "red" : undefined}
                onClick={handleToggleFavorite}
                aria-label={
                  isFavorite(id) ? "Remove from wishlist" : "Add to wishlist"
                }
              >
                <IconHeart
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                  fill={isFavorite(id) ? "red" : "none"}
                />
              </ActionIcon>
            )}
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
