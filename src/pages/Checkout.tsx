import {
  Container,
  Grid,
  Text,
  Group,
  Radio,
  Image,
  TextInput,
  Divider,
  Paper,
} from "@mantine/core";
import { useState } from "react";
import { ContentLayout } from "../components/templates/ContentLayout";
import AppButton from "../components/atoms/AppButton";
import { useCart } from "../utils/contexts/cartContext";


function Checkout() {
  const { cart } = useCart();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [country, setCountry] = useState("");
  const [method, setMethod] = useState("paypal");

  const shippingFee = 0;
  const tax = 10;
  const subtotal = cart.reduce(
    (sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 1),
    0
  );
  const total = subtotal + shippingFee + tax;

  return (
    <ContentLayout hasBanner hasBreadcrumbs bannerText="Checkout">
      <Container size="xl" pt={32} pb={32}>
        <Grid gutter={32}>
          {/* Billing Details */}
          <Grid.Col span={7}>
            <Text fw={600} size="lg" mb={24}>
              Billing Details
            </Text>
            <Paper radius="md" p={32} bg="#F9FBFC" style={{ minHeight: 300 }}>
              <TextInput
                label="Address"
                placeholder="Address *"
                value={address}
                onChange={(e) => setAddress(e.currentTarget.value)}
                mb={16}
                size="md"
                required
              />
              <TextInput
                label="City"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.currentTarget.value)}
                mb={16}
                size="md"
              />
              <TextInput
                label="Postal code"
                placeholder="Postal code"
                value={postal}
                onChange={(e) => setPostal(e.currentTarget.value)}
                mb={16}
                size="md"
              />
              <TextInput
                label="Country"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.currentTarget.value)}
                mb={16}
                size="md"
              />
            </Paper>
          </Grid.Col>
          {/* Products & Summary */}
          <Grid.Col span={5}>
            <Text fw={600} size="lg" mb={24}>
              Products
            </Text>
            <Paper
              radius="md"
              bg="#F9FBFC"
              pt={52}
              pb={52}
              pr={16}
              pl={16}
              style={{ minHeight: 300 }}
            >
              {cart.map((item) => (
                <Group align="center" gap={16} mb={16} key={item.id}>
                  <Image
                    src={item.img || item.image}
                    alt={item.title}
                    h={60}
                    w={80}
                    fit="contain"
                    radius="md"
                    bg="#F9FBFC"
                  />
                  <div>
                    <Text fw={600} size="md" mb={2}>
                      {item.title}
                    </Text>
                    <Text size="sm" color="dimmed" mb={2}>
                      Brand: {item.brand}
                    </Text>
                  </div>
                  <Text fw={500} size="md" ml="auto">
                    ${item.price}
                  </Text>
                </Group>
              ))}
              <Divider mb={16} />
              <Text fw={600} size="lg" mb={12}>
                Shipping
              </Text>
              <Group justify="space-between" mb={8}>
                <Text color="dimmed">Shipping</Text>
                <Text>${shippingFee.toFixed(2)}</Text>
              </Group>
              <Group justify="space-between" mb={8}>
                <Text color="dimmed">Tax</Text>
                <Text>${tax.toFixed(2)}</Text>
              </Group>
              <Divider mb={16} />
              <Group justify="space-between" mb={8} mt={16}>
                <Text fw={600}>Total</Text>
                <Text fw={700}>${total.toFixed(2)}</Text>
              </Group>
              <Divider mb={16} />
              <Text fw={500} mb={8}>
                Select Method
              </Text>
              <Radio.Group
                value={method}
                onChange={setMethod}
                name="payment-method"
              >
                <Radio value="paypal" label="Paypal or credit card" />
              </Radio.Group>
              <AppButton
                size="md"
                color="blue.7"
                style={{ minWidth: 280, marginTop: 24 }}
                fullWidth={true}
              >
                Place order
              </AppButton>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </ContentLayout>
  );
}

export default Checkout;
