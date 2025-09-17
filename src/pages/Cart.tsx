import {
  Container,
  Grid,
  Text,
  Card,
  Group,
  NumberInput,
  Image,
  Anchor,
  Center,
} from "@mantine/core";
import { ContentLayout } from "../components/templates/ContentLayout";
import AppButton from "../components/atoms/AppButton";
import { useCart } from "../utils/contexts/cartContext";
import { useNavigate } from "react-router";

function Cart() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (
    id: string | number,
    value: number | string
  ) => {
    updateQuantity(id, typeof value === "number" ? value : 1);
  };

  const handleRemove = (id: string | number) => {
    removeFromCart(id);
  };

  const total = cart.reduce(
    (sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 1),
    0
  );

  return (
    <ContentLayout hasBanner hasBreadcrumbs bannerText="Cart">
      <Container size="xl" pt={32} pb={32}>
        <Card radius="md" p={32} bg="#fff" style={{ minHeight: 300 }}>
          <Grid
            gutter={0}
            mb={16}
            style={{ borderBottom: "1px solid #E9ECEF" }}
          >
            <Grid.Col span={5}>
              <Text fw={600} size="md" mb={8}>
                Product
              </Text>
            </Grid.Col>
            <Grid.Col span={2}>
              <Text fw={600} size="md" mb={8}>
                Price
              </Text>
            </Grid.Col>
            <Grid.Col span={2}>
              <Text fw={600} size="md" mb={8}>
                Quantity
              </Text>
            </Grid.Col>
            <Grid.Col span={3}>
              <Text fw={600} size="md" mb={8}>
                Total
              </Text>
            </Grid.Col>
          </Grid>
          {cart.length === 0 ? (
            <Center py={40}>
              <Text color="dimmed">Your cart is empty.</Text>
            </Center>
          ) : (
            cart.map((item) => (
              <Grid
                gutter={0}
                align="center"
                key={item.id}
                style={{ borderBottom: "1px solid #F1F3F5", padding: "16px 0" }}
              >
                <Grid.Col span={5}>
                  <Group align="center" gap={16}>
                    <Image
                      src={item.img || item.image}
                      alt={item.title}
                      h={60}
                      w={80}
                      fit="contain"
                      radius="md"
                      bg="#F9FBFC"
                    />
                    <div>
                      <Text fw={600} size="md" mb={2}>
                        {item.title}
                      </Text>
                      <Text size="sm" color="dimmed" mb={2}>
                        Brand: {item.brand}
                      </Text>
                      <Anchor
                        color="red.6"
                        size="sm"
                        mt={4}
                        onClick={() => handleRemove(item.id)}
                        style={{ display: "inline-block" }}
                      >
                        Remove
                      </Anchor>
                    </div>
                  </Group>
                </Grid.Col>
                <Grid.Col span={2}>
                  <Text fw={500} size="md">
                    ${item.price}
                  </Text>
                </Grid.Col>
                <Grid.Col span={2}>
                  <NumberInput
                    value={item.quantity}
                    min={1}
                    max={10}
                    size="md"
                    style={{ width: 80 }}
                    onChange={(value) => handleQuantityChange(item.id, value)}
                  />
                </Grid.Col>
                <Grid.Col span={3}>
                  <Text fw={500} size="md">
                    ${((item.price ?? 0) * item.quantity).toFixed(2)}
                  </Text>
                </Grid.Col>
              </Grid>
            ))
          )}
        </Card>
        <Group mt={32} mb={16} justify="end">
          <Text fw={500} size="md">
            Items: {cart.length}
          </Text>
          <Text fw={700} size="md">
            Total: ${total.toFixed(2)}
          </Text>
        </Group>
        <AppButton
          size="md"
          color="blue.7"
          style={{ minWidth: 280, margin: "0 auto", display: "block" }}
          fullWidth={false}
          onClick={() => navigate("/checkout")}
        >
          Proceed to checkout
        </AppButton>
      </Container>
    </ContentLayout>
  );
}

export default Cart;
