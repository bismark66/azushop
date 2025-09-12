import { useState } from "react";
import {
  Button,
  Group,
  Input,
  Text,
  Title,
  Divider,
  Stack,
  ActionIcon,
  Container,
} from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import { Link } from "react-router";
import { useAddCategory, useGetAllCategories } from "../http/product.mutations";

export default function Category() {
  const { data, isPending, isError, refetch } = useGetAllCategories();
  const addCategoryMutation = useAddCategory();
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim()) return;
    try {
      await addCategoryMutation.mutateAsync(
        { name: categoryName },
        {
          onSuccess: () => {
            refetch();
          },
        }
      );
      setCategoryName("");
    } catch {
      console.error("Failed to add category");
    }
  };

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div>
      <Container size="xl" pt={32} pb={32}>
        <Group align="center" gap={8}>
          <ActionIcon
            component={Link}
            to="/product"
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
        style={{ background: "#f8f9fa", minHeight: "100vh" }}
      >
        <Group mb={24} align="center">
          <Title order={3} ml={8} fw={700}>
            Category
          </Title>
        </Group>
        <form onSubmit={handleSubmit}>
          <Stack gap={16} mb={24}>
            <Input
              placeholder="Write category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.currentTarget.value)}
              size="lg"
              radius="md"
              bg="#F4F7FB"
            />
            <Button
              type="submit"
              color="blue"
              radius="md"
              size="md"
              style={{ width: 120 }}
            >
              Submit
            </Button>
          </Stack>
        </form>
        <Divider mb={24} />
        <Group gap={16} mb={32}>
          {Array.isArray(data)
            ? data.map((cat: { _id: string; name: string }) => (
                <Button
                  key={cat._id}
                  variant="outline"
                  radius="md"
                  color="blue"
                  style={{ textTransform: "capitalize" }}
                >
                  {cat.name}
                </Button>
              ))
            : ["Laptop", "Phone", "Camera", "Watch", "Tablet"].map((cat) => (
                <Button
                  key={cat}
                  variant="outline"
                  radius="md"
                  color="blue"
                  style={{ textTransform: "capitalize" }}
                >
                  {cat}
                </Button>
              ))}
        </Group>
      </Container>
    </div>
  );
}
