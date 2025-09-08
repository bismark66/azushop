import { useState } from "react";
import {
  Container,
  Grid,
  Title,
  Text,
  Group,
  Image,
  Select,
  Textarea,
  Tabs,
  Card,
  NumberInput,
  Divider,
} from "@mantine/core";
import AppButton from "../components/atoms/AppButton";
import { ContentLayout } from "../components/templates/ContentLayout";
import ProductCard from "../components/molecules/ProductCard";
import { useParams } from "react-router";
import { productsData } from "../data/productsData";
import { useBreadcrumb } from "../utils/contexts/breadCrumpContext";
import { useEffect } from "react";

function ProductDetails() {
  const { id } = useParams();
  const productId = Number(id);
  const product = productsData.find((p) => p.id === productId);
  const relatedProducts = productsData.filter((p) => p.id !== productId);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("related");
  const [rating, setRating] = useState("");
  const [comments, setComments] = useState("");
  const { appendBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    if (product) {
      appendBreadcrumb(`/product/${product.id}`, product.title);
    }
  }, [appendBreadcrumb, product]);

  if (!product) {
    return (
      <ContentLayout hasBreadcrumbs>
        <Container size="xl" pt={32} pb={32}>
          <Title order={3}>Product not found</Title>
        </Container>
      </ContentLayout>
    );
  }
  return (
    <ContentLayout hasBreadcrumbs>
      <Container size="xl" pt={32} pb={32}>
        {/* Top section: image and info */}
        <Grid gutter={40} mb={32}>
          <Grid.Col span={6}>
            <Card radius="md" p={32} bg="#F9FBFC" style={{ minHeight: 400 }}>
              <Image
                src={product.image}
                alt={product.title}
                radius="md"
                fit="contain"
                h={316}
              />
            </Card>
          </Grid.Col>
          <Grid.Col span={6}>
            <Title order={3} mb={8}>
              {product.title}
            </Title>
            <Text fw={600} size="md" mb={4}>
              Brand: {product.brand}
            </Text>
            <Group mb={8}>
              <Text fw={500} size="md" color="blue.7">
                ${product.price}
              </Text>
              <Text size="sm" color="green.6">
                In stock
              </Text>
            </Group>
            <Text size="sm" color="dimmed" mb={16}>
              {product.description}
            </Text>
            <Group align="center" mb={16}>
              <NumberInput
                label="Quantity"
                value={quantity}
                onChange={(value) =>
                  setQuantity(typeof value === "number" ? value : 1)
                }
                min={1}
                max={10}
                size="md"
                style={{ width: 120 }}
              />
            </Group>
            <AppButton
              size="md"
              color="blue.7"
              style={{ minWidth: 180 }}
              fullWidth
            >
              Add to cart
            </AppButton>
            <Divider my={24} />
          </Grid.Col>
        </Grid>
        {/* Tabs section below product info */}
        <Grid justify="center">
          <Grid.Col span={6}>
            {/* <Divider my={24} /> */}
            <Tabs
              value={activeTab}
              onChange={(value) => setActiveTab(value ?? "related")}
            >
              <Tabs.List>
                <Tabs.Tab value="related">Related Product</Tabs.Tab>
                <Tabs.Tab value="review">Write your Review</Tabs.Tab>
                <Tabs.Tab value="allReviews">All Reviews</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="related" pt={16}>
                <Grid>
                  {relatedProducts.map((prod) => (
                    <Grid.Col key={prod.id} span={4}>
                      <ProductCard
                        img={prod.image}
                        title={prod.title}
                        description={prod.description}
                        price={prod.price}
                        brand={prod.brand}
                      />
                    </Grid.Col>
                  ))}
                </Grid>
              </Tabs.Panel>
              <Tabs.Panel value="review" pt={16}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    // handle submit
                  }}
                >
                  <Select
                    label="Ratings"
                    placeholder="Select"
                    data={[
                      { value: "1", label: "1" },
                      { value: "2", label: "2" },
                      { value: "3", label: "3" },
                      { value: "4", label: "4" },
                      { value: "5", label: "5" },
                    ]}
                    value={rating}
                    onChange={(value) => setRating(value ?? "")}
                    mb={12}
                    size="md"
                    style={{ maxWidth: 200 }}
                  />
                  <Textarea
                    label="Comments"
                    placeholder="Your comments"
                    value={comments}
                    onChange={(e) => setComments(e.currentTarget.value)}
                    mb={12}
                    size="md"
                    minRows={3}
                  />
                  <AppButton
                    type="submit"
                    color="blue.7"
                    size="md"
                    style={{ minWidth: 180 }}
                    fullWidth
                  >
                    Submit
                  </AppButton>
                </form>
              </Tabs.Panel>
              <Tabs.Panel value="allReviews" pt={16}>
                <Text color="dimmed">No reviews yet.</Text>
              </Tabs.Panel>
            </Tabs>
          </Grid.Col>
        </Grid>
      </Container>
    </ContentLayout>
  );
}

export default ProductDetails;
