import {
  Container,
  Group,
  Text,
  Tabs,
  Card,
  SimpleGrid,
  ActionIcon,
  Divider,
  Box,
} from "@mantine/core";
import { IconEdit, IconChevronLeft } from "@tabler/icons-react";
import { productsData } from "../data/productsData";
import { Link } from "react-router";

import { useState } from "react";
import AddProductForm from "../components/organisms/AddProduct";

export default function AdminProducts() {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <>
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
        <Group justify="space-between" mb={24}>
          <Tabs
            value={activeTab}
            onChange={setActiveTab}
            radius="md"
            color="blue"
          >
            <Tabs.List>
              <Tabs.Tab
                value="products"
                style={{ fontWeight: 600, fontSize: 18 }}
              >
                Products
              </Tabs.Tab>
              <Tabs.Tab
                value="create"
                style={{ fontWeight: 600, fontSize: 18 }}
              >
                Create Product
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
          <Text fw={700} size="md" c="#222">
            Total: {productsData.length.toString().padStart(2, "0")}
          </Text>
        </Group>
        <Divider mb={24} />
        {activeTab === "products" ? (
          <SimpleGrid cols={3} spacing={32}>
            {productsData.map((product) => (
              <Card
                key={product.id}
                shadow="xs"
                radius="md"
                p={20}
                style={{
                  border: "1px solid #e0e0e0",
                  background: "#fff",
                  minHeight: 260,
                }}
              >
                <Box
                  mb={12}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{
                      width: 120,
                      height: 90,
                      objectFit: "contain",
                      borderRadius: 8,
                      background: "#f4f4f4",
                      border: "1px solid #e0e0e0",
                    }}
                  />
                </Box>
                <Text
                  fw={600}
                  size="md"
                  c="#222"
                  mb={8}
                  style={{ textAlign: "center" }}
                >
                  {product.title}
                </Text>
                <Text size="sm" c="#666" mb={8} style={{ textAlign: "center" }}>
                  {product.description}
                </Text>
                <Text fw={700} size="md" c="#1976d2" ta="center">
                  ${product.price}
                </Text>
                <Divider mt={4} />
                <Group justify="space-between" mt={16}>
                  <Text size="xs" c="#888">
                    05/07/2025
                  </Text>
                  <ActionIcon
                    variant="subtle"
                    color="blue"
                    radius="md"
                    size={32}
                    style={{
                      border: "1px solid #e0e0e0",
                      background: "#f4f4f4",
                    }}
                  >
                    <IconEdit size={18} />
                  </ActionIcon>
                </Group>
              </Card>
            ))}
          </SimpleGrid>
        ) : (
          <AddProductForm />
        )}
      </Container>
    </>
  );
}
