import { Container, Grid } from "@mantine/core";
import { ContentLayout } from "../components/templates/ContentLayout";
import ProductCard from "../components/molecules/ProductCard";
import { productsData } from "../data/productsData";

// For demo, favourite contains one product
const favouriteProducts = [productsData.find((p) => p.id === 9)].filter(
  Boolean
);

function Favourite() {
  return (
    <ContentLayout hasBanner hasBreadcrumbs bannerText="Favourite">
      <Container size="xl" pt={32} pb={32}>
        <Grid>
          {favouriteProducts.length === 0
            ? null
            : favouriteProducts.map((product) =>
                product ? (
                  <Grid.Col key={product.id} span={3}>
                    <ProductCard
                      img={product.image}
                      title={product.title}
                      description={product.description}
                      price={product.price}
                      brand={product.brand}
                      showDelete
                    />
                  </Grid.Col>
                ) : null
              )}
        </Grid>
      </Container>
    </ContentLayout>
  );
}

export default Favourite;
