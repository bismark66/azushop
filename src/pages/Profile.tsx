import { useState } from "react";
import {
  Container,
  Group,
  Text,
  Tabs,
  Input,
  Button,
  Stack,
  ActionIcon,
} from "@mantine/core";
import AppTable from "../components/organisms/AppTable";
import { useEffect } from "react";
import { getUser } from "../utils/helpers";
import { IconChevronLeft } from "@tabler/icons-react";
import { Link } from "react-router";

export default function Profile() {
  // Mock orders data
  const orders = [
    {
      image: "/src/assets/featured/Macbook.png",
      id: "6537b4bfb1be49c3f658",
      date: "2025-03-1",
      total: "$ 1250.00",
      paid: "completed",
      delivered: "Pending",
    },
    {
      image: "/src/assets/featured/Macbook.png",
      id: "6537b4bfb1be49c3f658",
      date: "2025-03-1",
      total: "$ 1250.00",
      paid: "completed",
      delivered: "Delivered",
    },
    // ...more rows
  ];

  const columns = [
    {
      key: "image",
      label: "Image",
      render: (row: Record<string, unknown>) => (
        <img
          src={row.image as string}
          alt="product"
          style={{ width: 40, borderRadius: 8 }}
        />
      ),
      align: "center" as const,
    },
    { key: "id", label: "Id" },
    { key: "date", label: "Date" },
    { key: "total", label: "Total" },
    {
      key: "paid",
      label: "Paid",
      render: (row: Record<string, unknown>) => (
        <span
          style={{
            background: row.paid === "completed" ? "#E6F4EA" : "#F9E6E6",
            color: row.paid === "completed" ? "#2ECC40" : "#FF4136",
            padding: "4px 12px",
            borderRadius: 6,
            fontWeight: 500,
          }}
        >
          {row.paid as string}
        </span>
      ),
      align: "center" as const,
    },
    {
      key: "delivered",
      label: "Delivered",
      render: (row: Record<string, unknown>) => (
        <span
          style={{
            background: row.delivered === "Delivered" ? "#E6F4EA" : "#F9E6E6",
            color: row.delivered === "Delivered" ? "#2ECC40" : "#FF4136",
            padding: "4px 12px",
            borderRadius: 6,
            fontWeight: 500,
          }}
        >
          {row.delivered as string}
        </span>
      ),
      align: "center" as const,
    },
    {
      key: "action",
      label: "",
      render: () => (
        <Button variant="subtle" color="blue" radius="md" size="xs">
          <span role="img" aria-label="view">
            👁️
          </span>
        </Button>
      ),
      align: "center" as const,
    },
  ];
  const [activeTab, setActiveTab] = useState("profile");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const user = getUser();
    if (user) {
      setName(user.first_name);
      setEmail(user.email || "");
    }
  }, []);

  return (
    <div>
      <Container size="xl" pt={32} pb={32}>
        <Group align="center" gap={8}>
          <ActionIcon
            component={Link}
            to="/shop"
            variant="subtle"
            color="dark"
            size={32}
            radius="md"
            style={{ border: "1px solid #e0e0e0", background: "#fff" }}
          >
            <IconChevronLeft size={20} />
          </ActionIcon>
          <Text fw={500} size="md" c="#222" style={{ marginLeft: 8 }}>
            Back
          </Text>
        </Group>
      </Container>
      <Container
        size="xl"
        pt={32}
        pb={32}
        style={{ background: "#f8f9fa", minHeight: "70vh" }}
      >
        <Tabs
          value={activeTab}
          onChange={(value) => setActiveTab(value ?? "profile")}
        >
          <Tabs.List>
            <Tabs.Tab value="profile">Update Profile</Tabs.Tab>
            <Tabs.Tab value="orders">My orders</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="profile">
            <Stack gap={16} mt={32}>
              <Input
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                size="lg"
                radius="md"
                style={{ background: "#F4F7FB" }}
              />
              <Input
                placeholder="johndoe@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                size="lg"
                radius="md"
                style={{ background: "#F4F7FB" }}
              />
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                size="lg"
                radius="md"
                style={{ background: "#F4F7FB" }}
              />
              <Input
                placeholder="Confirm password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                size="lg"
                radius="md"
                style={{ background: "#F4F7FB" }}
              />
              <Button
                color="blue"
                radius="md"
                size="md"
                style={{ width: 120, alignSelf: "flex-start" }}
              >
                Update
              </Button>
            </Stack>
          </Tabs.Panel>
          <Tabs.Panel value="orders">
            <div style={{ marginTop: 32 }}>
              <AppTable columns={columns} data={orders} />
            </div>
          </Tabs.Panel>
        </Tabs>
      </Container>
    </div>
  );
}
