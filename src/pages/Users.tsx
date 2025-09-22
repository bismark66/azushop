import { Container, Group, Text, Card, ActionIcon } from "@mantine/core";
import AppTable from "../components/organisms/AppTable";
import { IconCheck, IconX, IconEdit, IconTrash } from "@tabler/icons-react";
import { useGetAllUsers } from "../http/mutations";

export default function UsersAdminPage() {
  const { data: users, isLoading, isError } = useGetAllUsers();

  const columns = [
    { key: "_id", label: "Id" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    {
      key: "isAdmin",
      label: "Admin",
      render: (row: Record<string, unknown>) =>
        row.isAdmin ? (
          <IconCheck size={20} color="#2ECC40" />
        ) : (
          <IconX size={20} color="#FF4136" />
        ),
      align: "center" as const,
    },
    {
      key: "action",
      label: "Action",
      render: () => (
        <Group gap={8}>
          <ActionIcon variant="subtle" color="blue" radius="md" size={28}>
            <IconEdit size={18} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red" radius="md" size={28}>
            <IconTrash size={18} />
          </ActionIcon>
        </Group>
      ),
      align: "center" as const,
    },
  ];

  const tableData = (users || []).map((user: any) => ({
    _id: user._id,
    name: user.first_name || user.username || "-",
    email: user.email,
    isAdmin: user.isAdmin,
  }));

  return (
    <Container size="xl" pt={32} pb={32}>
      <Group align="center" gap={8} mb={24}>
        <Text fw={500} size="md" c="#222" style={{ marginLeft: 8 }}>
          &lt; Back
        </Text>
      </Group>
      <Card p={0} radius="md" style={{ background: "#fff" }}>
        <Text fw={600} size="lg" p={24} pb={0}>
          Users
        </Text>
        {isLoading && (
          <Text size="sm" p={24}>
            Loading users...
          </Text>
        )}
        {isError && (
          <Text size="sm" c="red" p={24}>
            Failed to load users.
          </Text>
        )}
        {!isLoading && !isError && tableData.length === 0 && (
          <Text size="sm" c="dimmed" p={24}>
            No users found.
          </Text>
        )}
        {!isLoading && !isError && tableData.length > 0 && (
          <AppTable columns={columns} data={tableData} />
        )}
      </Card>
    </Container>
  );
}
