import { Container, Grid } from "@mantine/core";
import { ContentLayout } from "../components/templates/ContentLayout";
import ProductCard from "../components/molecules/ProductCard";

import { useWishlist } from "../utils/contexts/wishlistContext";
import { useGetProductById } from "../http/product.mutations";

function Favourite() {
  const { wishlist } = useWishlist();

  // Fetch all wishlist products from backend
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const productQueries = wishlist.map((id) => useGetProductById(String(id)));
  const isLoading = productQueries.some((q) => q.isLoading);
  const isError = productQueries.some((q) => q.isError);
  // Only include products that are not undefined/null
  const products = productQueries
    .map((q) => q.data)
    .filter((p): p is import("../types/product.types").ProductResponse => !!p);

  return (
    <ContentLayout hasBanner hasBreadcrumbs bannerText="Favourite">
      <Container size="xl" pt={32} pb={32}>
        <Grid>
          {wishlist.length === 0 ? (
            <div style={{ width: "100%", textAlign: "center", padding: 40 }}>
              No favorite products yet.
            </div>
          ) : isLoading ? (
            <div style={{ width: "100%", textAlign: "center", padding: 40 }}>
              Loading wishlist...
            </div>
          ) : isError ? (
            <div
              style={{
                width: "100%",
                textAlign: "center",
                padding: 40,
                color: "red",
              }}
            >
              Error loading some products.
            </div>
          ) : products.length === 0 ? (
            <div style={{ width: "100%", textAlign: "center", padding: 40 }}>
              No favorite products found.
            </div>
          ) : (
            products.map((product) => (
              <Grid.Col key={product._id} span={3}>
                <ProductCard
                  img={product.image}
                  title={product.name}
                  description={product.description}
                  price={product.price}
                  brand={product.brand}
                  id={product._id}
                />
              </Grid.Col>
            ))
          )}
        </Grid>
      </Container>
    </ContentLayout>
  );
}

export default Favourite;
