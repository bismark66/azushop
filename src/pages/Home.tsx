import { Hero } from "../components/molecules/Hero";
import {
  Container,
  Grid,
  Title,
  Text,
  Center,
  useMantineTheme,
} from "@mantine/core";
import FeatureCard from "../components/molecules/FeatureCard";
import Macbook from "../assets/featured/Macbook.png";
import Iphones from "../assets/featured/iphones.png";
import Digital_Lens from "../assets/featured/Digital_Lens.png";
import { IconDiamondFilled, IconPackage, IconTruck } from "@tabler/icons-react";

function Home() {
  const theme = useMantineTheme();
  return (
    <>
      <Hero />
      <section>
        <Container size={"xl"} mt={50} mb={50}>
          <Grid>
            <Grid.Col span={12}>
              <Center>
                <Title order={3} size={42} fw={600}>
                  Top Trending Products
                </Title>
              </Center>
              <Center>
                <Text
                  fs={"md"}
                  fw={400}
                  ta={"center"}
                  mt={10}
                  mb={20}
                  maw={900}
                >
                  Discover the latest must-have items that are taking the market
                  by storm. Stay ahead with our curated collection of trending
                  products designed to elevate your lifestyle.
                </Text>
              </Center>
            </Grid.Col>
          </Grid>
          <Grid justify="center" mt={"xl"}>
            <Grid.Col span={12}>
              <Grid justify="space-between">
                <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 4 }}>
                  <FeatureCard
                    style={{ background: "#E6EFF5" }}
                    img={Macbook}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 4 }}>
                  <FeatureCard
                    style={{ background: "#D4EEF9" }}
                    img={Iphones}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 4 }}>
                  <FeatureCard
                    style={{ background: "#E6EFF5" }}
                    img={Digital_Lens}
                  />
                </Grid.Col>
              </Grid>
            </Grid.Col>
          </Grid>
        </Container>
      </section>

      <section>
        <Container fluid mt={50} bg={theme.colors.primaryColor[0]}>
          <Container size={"xl"}>
            <Grid c={"#fff"} pt={50} pb={50}>
              <Grid.Col span={12} mb={30}>
                <Text size={"xl"} maw={500}>
                  We're tackling the biggest challenges in laptops and
                  electronic products.
                </Text>
              </Grid.Col>
              <Grid justify="space-between">
                <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 4 }}>
                  <Center>
                    <IconTruck size={40} />
                  </Center>
                  <Title order={5} ta={"center"} mt={10}>
                    Fast & free shipping
                  </Title>
                  <Text ta={"center"} fw={400} size="md" mt={20}>
                    Every single order ships for free. No minimums, no tiers, no
                    fine print whatsoever.
                  </Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <Center>
                    <IconPackage size={40} />
                  </Center>
                  <Title order={5} ta={"center"} mt={10}>
                    Innovative, User-Centric Design{" "}
                  </Title>
                  <Text ta={"center"} fw={400} size="md" mt={20}>
                    Our cutting-edge designs prioritize performance,
                    portability, and seamless integration into your lifestyle.
                  </Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 4 }}>
                  <Center>
                    <IconDiamondFilled size={40} />
                  </Center>
                  <Title order={5} ta={"center"} mt={10}>
                    Durable, High-Quality Materials
                  </Title>
                  <Text ta={"center"} fw={400} size="md" mt={20}>
                    We use premium aluminum, high-resolution OLED displays, and
                    durable batteries for superior quality.
                  </Text>
                </Grid.Col>
              </Grid>
            </Grid>
          </Container>
        </Container>
      </section>
    </>
  );
}

export default Home;
