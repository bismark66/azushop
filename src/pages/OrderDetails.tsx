import {
  Container,
  Grid,
  Card,
  Text,
  Group,
  Image,
  Divider,
  Box,
  Button,
} from "@mantine/core";
import { ContentLayout } from "../components/templates/ContentLayout";
import { useGetOrderDetails } from "../http/order.mutation";
import type { Orders } from "../types/order.types";
import { useParams, useNavigate } from "react-router";

type UserObj = { _id?: string; email?: string; username?: string };
function isUserObj(u: unknown): u is UserObj {
  return (
    typeof u === "object" &&
    u !== null &&
    ("email" in u || "username" in u || "_id" in u)
  );
}


function formatAddress(addr?: Orders["shippingAddress"]) {
  if (!addr) return "-";
  return [addr.address, addr.city, addr.postalCode, addr.country].filter(Boolean).join(", ");
}


function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: order, isLoading, isError } = useGetOrderDetails(id!);

  let itemsTotal = 0;
  let total = 0;
  if (order) {
    itemsTotal = order.orderItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
    total = itemsTotal + (order.shippingPrice || 0) + (order.taxPrice || 0);
  }

  if (isLoading) {
    return (
      <ContentLayout hasBreadcrumbs={false}>
        <Container size="xl" pt={32} pb={32} p={50}>
          <Text>Loading order details...</Text>
        </Container>
      </ContentLayout>
    );
  }
  if (isError || !order) {
    return (
      <ContentLayout hasBreadcrumbs={false}>
        <Container size="xl" pt={32} pb={32} p={50}>
          <Text color="red">Failed to load order details.</Text>
        </Container>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout hasBreadcrumbs={false}>
      <Container size="xl" pt={32} pb={32} p={50}>
        <Text c="blue.7" fw={600} style={{ cursor: "pointer" }} mb={24} onClick={() => navigate(-1)}>
          &lt; Back
        </Text>
        <Container size={"xl"} bg={"#F9FBFC"} p={20}>
          <Group mb={24} justify="space-between">
            <Text fw={600} size="lg">
              Order Details
            </Text>
          </Group>
          <Grid gutter={32}>
            <Grid.Col span={12}>
              <Grid gutter={0}>
                <Grid.Col span={8}>
                  <Box p={24} pt={0}>
                    <Grid
                      gutter={0}
                      mb={8}
                      p={20}
                      style={{ background: "#F9FBFC" }}
                    >
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
                    {order.orderItems.map((item, idx) => (
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
                            alt={item.name}
                          />
                        </Grid.Col>
                        <Grid.Col span={4}>
                          <Text size="sm">{item.name}</Text>
                        </Grid.Col>
                        <Grid.Col span={2}>
                          <Text size="sm">{item.qty}</Text>
                        </Grid.Col>
                        <Grid.Col span={2}>
                          <Text size="sm">${item.price.toFixed(2)}</Text>
                        </Grid.Col>
                        <Grid.Col span={2}>
                          <Text size="sm">${(item.price * item.qty).toFixed(2)}</Text>
                        </Grid.Col>
                      </Grid>
                    ))}
                  </Box>
                </Grid.Col>
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
                        Email:
                      </Text>
                      <Text size="sm">
                        {(() => {
                          if (isUserObj(order.user)) {
                            return order.user.email || order.user.username || order.user._id;
                          }
                          return order.user;
                        })()}
                      </Text>
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
                      <Text size="sm">{order.shippingAddress?.address || "-"}</Text>
                    </Group>
                    <Group mb={8} gap={4}>
                      <Text
                        fw={500}
                        size="sm"
                        color="dimmed"
                        style={{ minWidth: 80 }}
                      >
                        Address:
                      </Text>
                      <Text size="sm">{formatAddress(order.shippingAddress)}</Text>
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
                      <Text size="sm">{order.paymentMethod}</Text>
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
                      <Text size="sm">${(order.shippingPrice || 0).toFixed(2)}</Text>
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
                      <Text size="sm">${(order.taxPrice || 0).toFixed(2)}</Text>
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
                    <Button
                      color="#015B9A"
                      fullWidth
                      radius="md"
                      size="md"
                      mt={16}
                    >
                      Mark as delivered
                    </Button>
                  </Card>
                </Grid.Col>
              </Grid>
            </Grid.Col>
          </Grid>
        </Container>
      </Container>
    </ContentLayout>
  );
}

export default OrderDetails;
