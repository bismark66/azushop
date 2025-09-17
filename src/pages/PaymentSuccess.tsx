import { Container, Center, Title, Text, Group, Card } from "@mantine/core";
import AppButton from "../components/atoms/AppButton";
import { ContentLayout } from "../components/templates/ContentLayout";
import { useNavigate, useSearchParams } from "react-router";

function PaymentSuccess() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const reference = params.get("reference") || params.get("ref") || "";
  const orderId = params.get("orderId") || "";

  return (
    <ContentLayout hasBanner hasBreadcrumbs bannerText="Payment Success">
      <Container size="sm" pt={60} pb={80}>
        <Card radius="md" p={40} withBorder bg="#F9FBFC">
          <Center mb={24}>
            <Title order={2} style={{ color: "#228B22" }}>
              Payment Successful
            </Title>
          </Center>
          <Text ta="center" mb={12}>
            Thank you! Your payment has been processed.
          </Text>
          {orderId && (
            <Text ta="center" size="sm" color="dimmed" mb={4}>
              Order ID: {orderId}
            </Text>
          )}
          {reference && (
            <Text ta="center" size="sm" color="dimmed" mb={20}>
              Reference: {reference}
            </Text>
          )}
          <Group justify="center" mt={24}>
            <AppButton onClick={() => navigate("/me/orders")}>
              View My Orders
            </AppButton>
            <AppButton
              color="blue.6"
              variant="outline"
              onClick={() => navigate("/product")}
            >
              Continue Shopping
            </AppButton>
          </Group>
        </Card>
      </Container>
    </ContentLayout>
  );
}

export default PaymentSuccess;
