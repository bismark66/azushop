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
import { Link, useNavigate } from "react-router";
import { useUpdateProfile } from "../http/mutations";
import {
  useGetUserOrders,
  useGetAllOrdersByAdmin,
} from "../http/order.mutation";
import type { Orders } from "../types/order.types";
import type { User } from "../types/auth.types";
type UpdatePayload = Partial<User> & { password?: string };

export default function Profile() {
  const updateProfileMutation = useUpdateProfile();
  const [updateStatus, setUpdateStatus] = useState<string>("");
  const navigate = useNavigate();
  const user = getUser();
  const isAdmin = user?.isAdmin;
  const {
    data: userOrders = [],
    isLoading: userOrdersLoading,
    isError: userOrdersError,
  } = useGetUserOrders();
  const {
    data: adminOrders = [],
    isLoading: adminOrdersLoading,
    isError: adminOrdersError,
  } = useGetAllOrdersByAdmin();

  const formatDate = (iso?: string) => {
    if (!iso) return "-";
    try {
      const d = new Date(iso);
      return d.toLocaleDateString();
    } catch {
      return iso;
    }
  };

  const ordersRaw = isAdmin ? adminOrders : userOrders;
  const orders = (ordersRaw || []).map((o: Orders) => ({
    image: o.orderItems?.[0]?.image || "/src/assets/featured/Macbook.png",
    id: o._id,
    date: formatDate(o.createdAt),
    total: `$ ${Number(o.totalPrice || o.itemsPrice || 0).toFixed(2)}`,
    paid: o.isPaid ? "completed" : "pending",
    delivered: o.isDelivered ? "Delivered" : "Pending",
  }));

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
      render: (row: Record<string, unknown>) => (
        <Button
          variant="subtle"
          color="blue"
          radius="md"
          size="xs"
          onClick={() => navigate(`/me/orders/${row.id}`)}
        >
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

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdateStatus("");
    // Only send changed fields
    const payload: UpdatePayload = {};
    if (name) payload.first_name = name;
    if (email) payload.email = email;
    if (password && password === confirmPassword) payload.password = password;
    try {
      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined) formData.append(key, value as string);
      });
      await updateProfileMutation.mutateAsync(formData);
      setUpdateStatus("Profile updated successfully!");
    } catch (err: unknown) {
      setUpdateStatus((err as Error)?.message || "Failed to update profile");
    }
  };

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
            <form onSubmit={handleUpdateProfile}>
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
                  onChange={(e) => setPassword(e.target.value)}
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
                  type="submit"
                  color="blue"
                  radius="md"
                  size="md"
                  style={{ width: 120, alignSelf: "flex-start" }}
                  loading={updateProfileMutation.isPending}
                >
                  Update
                </Button>
                {updateStatus && (
                  <Text
                    size="sm"
                    color={updateStatus.includes("success") ? "green" : "red"}
                  >
                    {updateStatus}
                  </Text>
                )}
              </Stack>
            </form>
          </Tabs.Panel>
          <Tabs.Panel value="orders">
            <div style={{ marginTop: 32 }}>
              {(isAdmin ? adminOrdersLoading : userOrdersLoading) && (
                <Text size="sm">Loading orders...</Text>
              )}
              {(isAdmin ? adminOrdersError : userOrdersError) &&
                !(isAdmin ? adminOrdersLoading : userOrdersLoading) && (
                  <Text size="sm" c="red">
                    Failed to load orders.
                  </Text>
                )}
              {!(isAdmin ? adminOrdersLoading : userOrdersLoading) &&
                !(isAdmin ? adminOrdersError : userOrdersError) &&
                orders.length === 0 && (
                  <Text size="sm" c="dimmed">
                    You have no orders yet.
                  </Text>
                )}
              {!(isAdmin ? adminOrdersLoading : userOrdersLoading) &&
                !(isAdmin ? adminOrdersError : userOrdersError) &&
                orders.length > 0 && (
                  <AppTable columns={columns} data={orders} />
                )}
            </div>
          </Tabs.Panel>
        </Tabs>
      </Container>
    </div>
  );
}
