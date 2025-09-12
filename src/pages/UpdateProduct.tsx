import {
  Container,
  Group,
  Text,
  Card,
  Box,
  Button,
  SimpleGrid,
  Input,
  Select,
  Textarea,
} from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { productsData } from "../data/productsData";
import FileInput from "../components/molecules/FileInput";

// Define Product type to include 'quantity'
type Product = {
  id: number;
  title: string;
  price: string;
  quantity: string;
  brand: string;
  countInStock: string;
  category: string;
  description: string;
  image: string;
};

export default function UpdateProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const product = productsData.find((p) => p.id === Number(id)) as
    | Product
    | undefined;
  const [file, setFile] = useState<File | null>(null);

  // fallback for demo
  const initial: Product = product || {
    id: 0,
    title: 'Apple MacBook Pro 2019 | 16"',
    price: "749.99",
    quantity: "20",
    brand: "Apple",
    countInStock: "10",
    category: "Laptop",
    description: "RAM 16.0 GB | Memory 512 GB Keyboard layout Eng (English)",
    image: "src/assets/featured/Macbook.png",
  };

  return (
    <Container size="xl" pt={32} pb={32}>
      <Group align="center" gap={8} mb={8}>
        <Button
          variant="subtle"
          color="dark"
          size="md"
          radius="md"
          style={{ border: "1px solid #e0e0e0", background: "#fff" }}
          onClick={() => navigate(-1)}
        >
          <IconChevronLeft size={20} />
        </Button>
        <Text fw={500} size="md" c="#222" style={{ marginLeft: 8 }}>
          Back
        </Text>
      </Group>
      <Card
        shadow="sm"
        radius="md"
        p={32}
        style={{
          background: "#fff",
          border: "1px solid #e0e0e0",
          maxWidth: 800,
          margin: "0 auto",
        }}
      >
        <Group mb={24} gap={16} style={{ justifyContent: "center" }}>
          <FileInput onFileChange={setFile} />
          <Box style={{ display: "flex", alignItems: "center" }}>
            <img
              src={file ? URL.createObjectURL(file) : initial.image}
              alt={initial.title}
              style={{
                width: 180,
                height: 120,
                objectFit: "contain",
                borderRadius: 8,
                background: "#f4f4f4",
                border: "1px solid #e0e0e0",
              }}
            />
          </Box>
        </Group>
        <form>
          <SimpleGrid cols={2} spacing={16} mb={16}>
            <Input
              defaultValue={initial.title}
              placeholder="Product Title"
              size="lg"
              radius="md"
              style={{ background: "#F9FBFC" }}
            />
            <Input
              defaultValue={initial.price}
              placeholder="Price"
              size="lg"
              radius="md"
              style={{ background: "#F9FBFC" }}
              type="number"
            />
          </SimpleGrid>
          <SimpleGrid cols={2} spacing={16} mb={16}>
            <Input
              defaultValue={initial.quantity}
              placeholder="Quantity"
              size="lg"
              radius="md"
              style={{ background: "#F9FBFC" }}
              type="number"
            />
            <Input
              defaultValue={initial.brand}
              placeholder="Brand"
              size="lg"
              radius="md"
              style={{ background: "#F9FBFC" }}
            />
          </SimpleGrid>
          <SimpleGrid cols={2} spacing={16} mb={16}>
            <Input
              defaultValue={initial.countInStock}
              placeholder="Count in stock"
              size="lg"
              radius="md"
              style={{ background: "#F9FBFC" }}
              type="number"
            />
            <Select
              defaultValue={initial.category}
              placeholder="Category"
              data={[
                "Electronics",
                "Laptops",
                "Phones",
                "Accessories",
                "Laptop",
              ]}
              size="lg"
              radius="md"
              style={{ background: "#F9FBFC" }}
            />
          </SimpleGrid>
          <Textarea
            defaultValue={initial.description}
            placeholder="Description"
            size="xl"
            radius="md"
            minRows={4}
            mb={24}
            style={{ background: "#F9FBFC" }}
          />
          <Group gap={16} mt={8} style={{ justifyContent: "center" }}>
            <Button
              type="submit"
              color="blue"
              radius="md"
              size="md"
              style={{ width: 180, fontWeight: 600 }}
            >
              Update
            </Button>
            <Button
              type="button"
              color="red"
              radius="md"
              size="md"
              style={{ width: 180, fontWeight: 600 }}
            >
              Delete
            </Button>
          </Group>
        </form>
      </Card>
    </Container>
  );
}
