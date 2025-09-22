import {
  Container,
  Group,
  Card,
  Text,
  Badge,
  Image,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { IconArrowBack, IconEye } from "@tabler/icons-react";
import { ContentLayout } from "../components/templates/ContentLayout";
import AppTable from "../components/organisms/AppTable";
import { productsData } from "../data/productsData";

const orders = [
  {
    image: productsData[8].image,
    id: "6537b4b8f1b4e9c5k4568",
    date: "2025-09-07",
    total: 1250.0,
    paid: true,
    delivered: false,
  },
];

const columns = [
  {
    key: "image",
    label: "Image",
    render: (row: Record<string, unknown>) => (
      <Image
        src={row.image as string}
        h={40}
        w={60}
        fit="contain"
        radius="md"
        bg="#F9FBFC"
      />
    ),
    align: "center" as const,
    width: 80,
  },
  {
    key: "id",
    label: "Id",
    align: "center" as const,
  },
  {
    key: "date",
    label: "Date",
    align: "center" as const,
  },
  {
    key: "total",
    label: "Total",
    render: (row: Record<string, unknown>) =>
      `$${(row.total as number).toFixed(2)}`,
    align: "center" as const,
  },
  {
    key: "paid",
    label: "Paid",
    render: (row: Record<string, unknown>) =>
      row.paid ? (
        <Badge color="green">completed</Badge>
      ) : (
        <Badge color="gray">pending</Badge>
      ),
    align: "center" as const,
  },
  {
    key: "delivered",
    label: "Delivered",
    render: (row: Record<string, unknown>) =>
      row.delivered ? (
        <Badge color="green">Delivered</Badge>
      ) : (
        <Badge color="yellow">Pending</Badge>
      ),
    align: "center" as const,
  },
  {
    key: "actions",
    label: "",
    render: () => (
      <Tooltip label="View order details" position="top">
        <ActionIcon color="blue" variant="light" radius="md">
          <IconEye size={20} />
        </ActionIcon>
      </Tooltip>
    ),
    align: "center" as const,
    width: 48,
  },
];

function MyOrders() {
  return (
    <ContentLayout hasBanner hasBreadcrumbs bannerText="My orders">
      <Container size="xl" pt={32} pb={32}>
        <Text fw={600} size="lg" mb={24}>
          <IconArrowBack />
          Back
        </Text>
        <Card radius="md" p={32} bg="#fff" style={{ minHeight: 300 }}>
          <Group mb={24} justify="space-between">
            <Text fw={600} size="lg">
              Update Profile
            </Text>
            <Text fw={600} size="lg">
              My orders
            </Text>
            {/* Could add a back button here if needed */}
          </Group>
          <AppTable columns={columns} data={orders} minWidth={900} />
        </Card>
      </Container>
    </ContentLayout>
  );
}

export default MyOrders;
