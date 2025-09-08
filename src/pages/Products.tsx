import { useState, useEffect } from "react";
import {
  Center,
  Checkbox,
  Container,
  Grid,
  Title,
  Text,
  Button,
} from "@mantine/core";
import { ContentLayout } from "../components/templates/ContentLayout";
import CategoryFilters from "../components/organisms/CategoryFilters";
import ProductCard from "../components/molecules/ProductCard";

import { productsData } from "../data/productsData";

const categories = [
  {
    label: "Product Categories",
    initiallyOpened: true,
    links: [
      { label: "Laptops", value: "Laptops" },
      { label: "Phones", value: "Phones" },
      { label: "Cameras", value: "Cameras" },
      { label: "Watches", value: "Watches" },
      { label: "Computers", value: "Computers" },
    ],
  },
];

function Products() {
  //   const { appendBreadcrumb } = useBreadcrumb();
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [price, setPrice] = useState("");

  useEffect(() => {
    // Filter products based on selected brands and categories
    let filtered = productsData;

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    setFilteredProducts(filtered);
  }, [selectedBrands, selectedCategories]);

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Brands data with controlled checkboxes
  const brands = [
    {
      label: "Brands",
      initiallyOpened: true,
      links: [
        {
          label: (
            <Checkbox
              checked={selectedBrands.includes("Apple")}
              onChange={() => handleBrandChange("Apple")}
              color="lime.4"
              iconColor="dark.8"
              size="sm"
              label="Apple"
            />
          ),
          value: "Apple",
        },
        {
          label: (
            <Checkbox
              checked={selectedBrands.includes("Samsung")}
              onChange={() => handleBrandChange("Samsung")}
              color="lime.4"
              iconColor="dark.8"
              size="sm"
              label="Samsung"
            />
          ),
          value: "Samsung",
        },
        {
          label: (
            <Checkbox
              checked={selectedBrands.includes("Lenovo")}
              onChange={() => handleBrandChange("Lenovo")}
              color="lime.4"
              iconColor="dark.8"
              size="sm"
              label="Lenovo"
            />
          ),
          value: "Lenovo",
        },
        {
          label: (
            <Checkbox
              checked={selectedBrands.includes("Sony")}
              onChange={() => handleBrandChange("Sony")}
              color="lime.4"
              iconColor="dark.8"
              size="sm"
              label="Sony"
            />
          ),
          value: "Sony",
        },
      ],
    },
  ];

  return (
    <ContentLayout hasBanner hasBreadcrumbs>
      <Container size="xl">
        <Grid mt={20}>
          <Grid.Col span={3}>
            <Title order={4} mb={20}>
              Shop By
            </Title>
            <CategoryFilters
              data={categories}
              onCategoryChange={handleCategoryChange}
              selectedCategories={selectedCategories}
            />
            <CategoryFilters
              data={brands}
              onBrandChange={handleBrandChange}
              selectedBrands={selectedBrands}
            />

            {/* Price filter and Reset button at the bottom */}
            <div style={{ marginTop: 40 }}>
              <Text mb={8} fw={500} size="sm">
                Price
              </Text>
              <input
                type="number"
                placeholder="Enter price"
                value={price}
                style={{
                  width: "100%",
                  marginBottom: 12,
                  padding: 8,
                  borderRadius: 4,
                  border: "1px solid #e0e0e0",
                }}
                onChange={(e) => setPrice(e.target.value)}
              />
              <Button
                variant="outline"
                fullWidth
                mt="md"
                style={{ marginTop: 16 }}
                onClick={() => {
                  setSelectedBrands([]);
                  setSelectedCategories([]);
                  setPrice("");
                }}
              >
                Reset
              </Button>
            </div>
          </Grid.Col>

          <Grid.Col span={8} offset={1}>
            <Title order={3} mb="md">
              Products{" "}
              {filteredProducts.length > 0
                ? `(${filteredProducts.length})`
                : ""}
            </Title>

            {filteredProducts.length === 0 ? (
              <Center style={{ height: "300px" }}>
                <Text size="lg" color="dimmed">
                  No products match your filters. Try adjusting your selection.
                </Text>
              </Center>
            ) : (
              <Grid
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "stretch",
                }}
              >
                {filteredProducts.map((product) => (
                  <Grid.Col
                    key={product.id}
                    span={4}
                    style={{
                      display: "flex",
                      alignItems: "stretch",
                    }}
                  >
                    <ProductCard
                      img={product.image}
                      title={product.title}
                      description={product.description}
                      price={product.price}
                      brand={product.brand}
                      id={product.id}
                    />
                  </Grid.Col>
                ))}
              </Grid>
            )}
          </Grid.Col>
        </Grid>
      </Container>
    </ContentLayout>
  );
}

export default Products;
