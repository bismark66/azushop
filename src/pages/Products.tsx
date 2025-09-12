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
import { useGetProducts, useGetAllCategories } from "../http/product.mutations";
import type { ProductResponse, CategoryResponse } from "../types/product.types";

function getCategoryFilterData(categories: CategoryResponse[] = []) {
  return [
    {
      label: "Product Categories",
      initiallyOpened: true,
      links: categories.map((cat) => ({ label: cat.name, value: cat.name })),
    },
  ];
}

function Products() {
  const { data: categoryData = [] } = useGetAllCategories();
  //   const { appendBreadcrumb } = useBreadcrumb();
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { data: products = [], isLoading, isError } = useGetProducts();
  const [filteredProducts, setFilteredProducts] = useState<ProductResponse[]>(
    []
  );
  const [price, setPrice] = useState("");

  useEffect(() => {
    // Filter products based on selected brands and categories
    let filtered = products;

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(
          typeof product.category === "string"
            ? product.category
            : product.category?.name
        )
      );
    }

    // Only update state if filteredProducts actually changed
    setFilteredProducts((prev) => {
      const prevIds = prev.map((p) => p._id).join(",");
      const newIds = filtered.map((p) => p._id).join(",");
      return prevIds !== newIds ? filtered : prev;
    });
  }, [products, selectedBrands, selectedCategories]);

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

  // Dynamically generate brand filter data from products
  const uniqueBrands = Array.from(new Set(products.map((p) => p.brand))).filter(
    Boolean
  );
  const brands = [
    {
      label: "Brands",
      initiallyOpened: true,
      links: uniqueBrands.map((brand) => ({
        label: (
          <Checkbox
            checked={selectedBrands.includes(brand)}
            onChange={() => handleBrandChange(brand)}
            color="lime.4"
            iconColor="dark.8"
            size="sm"
            label={brand}
          />
        ),
        value: brand,
      })),
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
              data={getCategoryFilterData(categoryData)}
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

            {isLoading ? (
              <Center style={{ height: "300px" }}>
                <Text size="lg" color="dimmed">
                  Loading products...
                </Text>
              </Center>
            ) : isError ? (
              <Center style={{ height: "300px" }}>
                <Text size="lg" color="red">
                  Failed to load products.
                </Text>
              </Center>
            ) : filteredProducts.length === 0 ? (
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
                    key={product._id}
                    span={4}
                    style={{
                      display: "flex",
                      alignItems: "stretch",
                    }}
                  >
                    <ProductCard
                      img={product.image}
                      title={product.name}
                      description={product.description}
                      price={product.price}
                      brand={product.brand}
                      id={product._id}
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
