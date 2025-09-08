import {
  Container,
  Grid,
  Card,
  Text,
  Group,
  Image,
  Divider,
  Box,
} from "@mantine/core";
import { ContentLayout } from "../components/templates/ContentLayout";
import { productsData } from "../data/productsData";

// Mock order data
const order = {
  id: "6537b4b8f1b4e9c5k4568",
  name: "John Doe",
  email: "johndoe@mail.com",
  address: "AK-1129-2299, GH",
  method: "PayStack",
  items: [
    {
      image: productsData[8].image,
      product: 'Apple MacBook Pro 2019 | 16"',
      quantity: 1,
      unitPrice: 1250,
      total: 1250,
    },
    {
      image: productsData[1].image,
      product: "iPhone 15",
      quantity: 1,
      unitPrice: 400,
      total: 400,
    },
    {
      image: productsData[8].image,
      product: 'Apple MacBook Pro 2019 | 16"',
      quantity: 1,
      unitPrice: 1250,
      total: 1250,
    },
    {
      image: productsData[8].image,
      product: 'Apple MacBook Pro 2019 | 16"',
      quantity: 1,
      unitPrice: 1250,
      total: 1250,
    },
  ],
  shipping: 0,
  tax: 20,
};

function OrderDetails() {
  const itemsTotal = order.items.reduce((sum, item) => sum + item.total, 0);
  const total = itemsTotal + order.shipping + order.tax;

  return (
    <ContentLayout hasBreadcrumbs={false}>
      <Container size="xl" pt={32} pb={32} p={50}>
        <Text c="blue.7" fw={600} style={{ cursor: "pointer" }} mb={24}>
          &lt; Back
        </Text>
        <Group mb={24} justify="space-between">
          <Text fw={600} size="lg">
            My orders
          </Text>
        </Group>
        <Grid gutter={32}>
          {/* Orders Table */}
          <Grid.Col span={8}>
            <Card radius="md" p={0} bg="#fff" style={{ minHeight: 300 }}>
              <Divider mb={0} />
              <Box p={24} pt={0}>
                <Grid gutter={0} mb={8} style={{ background: "#F9FBFC" }}>
                  <Grid.Col span={2}>
                    <Text fw={600} size="sm">
                      Image
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Text fw={600} size="sm">
                      Product
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={2}>
                    <Text fw={600} size="sm">
                      Quantity
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={2}>
                    <Text fw={600} size="sm">
                      Unit Price
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={2}>
                    <Text fw={600} size="sm">
                      Total
                    </Text>
                  </Grid.Col>
                </Grid>
                {order.items.map((item, idx) => (
                  <Grid
                    gutter={0}
                    align="center"
                    key={idx}
                    style={{
                      borderBottom: "1px solid #F1F3F5",
                      padding: "12px 0",
                    }}
                  >
                    <Grid.Col span={2}>
                      <Image
                        src={item.image}
                        h={40}
                        w={60}
                        fit="contain"
                        radius="md"
                        bg="#F9FBFC"
                        alt={item.product}
                      />
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Text size="sm">{item.product}</Text>
                    </Grid.Col>
                    <Grid.Col span={2}>
                      <Text size="sm">{item.quantity}</Text>
                    </Grid.Col>
                    <Grid.Col span={2}>
                      <Text size="sm">${item.unitPrice.toFixed(2)}</Text>
                    </Grid.Col>
                    <Grid.Col span={2}>
                      <Text size="sm">${item.total.toFixed(2)}</Text>
                    </Grid.Col>
                  </Grid>
                ))}
              </Box>
            </Card>
          </Grid.Col>
          {/* Shipping & Summary */}
          <Grid.Col span={4}>
            <Card radius="md" p={24} bg="#fff" style={{ minHeight: 300 }}>
              <Text fw={600} size="md" mb={16}>
                Shipping
              </Text>
              <Group mb={8} gap={4}>
                <Text
                  fw={500}
                  size="sm"
                  color="dimmed"
                  style={{ minWidth: 80 }}
                >
                  Order:
                </Text>
                <Text size="sm">{order.id}</Text>
              </Group>
              <Group mb={8} gap={4}>
                <Text
                  fw={500}
                  size="sm"
                  color="dimmed"
                  style={{ minWidth: 80 }}
                >
                  Name:
                </Text>
                <Text size="sm">{order.name}</Text>
              </Group>
              <Group mb={8} gap={4}>
                <Text
                  fw={500}
                  size="sm"
                  color="dimmed"
                  style={{ minWidth: 80 }}
                >
                  Email:
                </Text>
                <Text size="sm">{order.email}</Text>
              </Group>
              <Group mb={8} gap={4}>
                <Text
                  fw={500}
                  size="sm"
                  color="dimmed"
                  style={{ minWidth: 80 }}
                >
                  Order:
                </Text>
                <Text size="sm">{order.address}</Text>
              </Group>
              <Group mb={8} gap={4}>
                <Text
                  fw={500}
                  size="sm"
                  color="dimmed"
                  style={{ minWidth: 80 }}
                >
                  Method:
                </Text>
                <Text size="sm">{order.method}</Text>
              </Group>
              <Divider my={16} />
              <Text fw={600} size="md" mb={8}>
                Order Summary
              </Text>
              <Group mb={8} gap={4}>
                <Text
                  fw={500}
                  size="sm"
                  color="dimmed"
                  style={{ minWidth: 80 }}
                >
                  Items:
                </Text>
                <Text size="sm">${itemsTotal.toFixed(2)}</Text>
              </Group>
              <Group mb={8} gap={4}>
                <Text
                  fw={500}
                  size="sm"
                  color="dimmed"
                  style={{ minWidth: 80 }}
                >
                  Shipping:
                </Text>
                <Text size="sm">${order.shipping.toFixed(2)}</Text>
              </Group>
              <Group mb={8} gap={4}>
                <Text
                  fw={500}
                  size="sm"
                  color="dimmed"
                  style={{ minWidth: 80 }}
                >
                  Tax:
                </Text>
                <Text size="sm">${order.tax.toFixed(2)}</Text>
              </Group>
              <Group mb={8} gap={4}>
                <Text
                  fw={700}
                  size="sm"
                  color="dimmed"
                  style={{ minWidth: 80 }}
                >
                  Total:
                </Text>
                <Text fw={700} size="sm">
                  ${total.toFixed(2)}
                </Text>
              </Group>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </ContentLayout>
  );
}

export default OrderDetails;
