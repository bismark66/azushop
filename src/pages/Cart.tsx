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
import { useState } from "react";
import { ContentLayout } from "../components/templates/ContentLayout";
import AppButton from "../components/atoms/AppButton";
import { productsData } from "../data/productsData";

// For demo, cart contains one product
const initialCart = [
  {
    ...productsData.find((p) => p.id === 9),
    quantity: 1,
  },
];

function Cart() {
  const [cart, setCart] = useState(initialCart);

  const handleQuantityChange = (idx: number, value: number | string) => {
    setCart((prev) =>
      prev.map((item, i) =>
        i === idx
          ? { ...item, quantity: typeof value === "number" ? value : 1 }
          : item
      )
    );
  };

  const handleRemove = (idx: number) => {
    setCart((prev) => prev.filter((_, i) => i !== idx));
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
            cart.map((item, idx) => (
              <Grid
                gutter={0}
                align="center"
                key={item.id}
                style={{ borderBottom: "1px solid #F1F3F5", padding: "16px 0" }}
              >
                <Grid.Col span={5}>
                  <Group align="center" gap={16}>
                    <Image
                      src={item.image}
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
                        onClick={() => handleRemove(idx)}
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
                    onChange={(value) => handleQuantityChange(idx, value)}
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
        >
          Proceed to checkout
        </AppButton>
      </Container>
    </ContentLayout>
  );
}

export default Cart;
