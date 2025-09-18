import { useMutation, useQuery } from "@tanstack/react-query";
import { authorizedFetch } from "./queryClient";
import type {
  CreateOrder,
  Orders,
  OrderResponseType,
} from "../types/order.types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4009/api";

export function useCreateOrder() {
  return useMutation({
    mutationFn: async (data: CreateOrder): Promise<OrderResponseType> => {
      const res = await authorizedFetch(`${API_URL}/orders/`, {
        method: "POST",
        body: JSON.stringify(data), // send as JSON
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Create order failed");
      return await res.json();
    },
  });
}

type PaymentPayload = { orderId: string; callback_url: string };
interface PaymentInitResponse {
  authorization_url: string;
  access_code?: string;
  reference: string;
}

export function usePayment() {
  return useMutation({
    mutationFn: async ({
      orderId,
      callback_url,
    }: PaymentPayload): Promise<PaymentInitResponse> => {
      const res = await authorizedFetch(`${API_URL}/orders/pay`, {
        method: "POST",
        body: JSON.stringify({
          order: orderId,
          callback_url,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Payment initiation failed");
      return await res.json();
    },
  });
}

export function useGetUserOrders() {
  return useQuery({
    queryKey: ["user-orders"],
    queryFn: async (): Promise<Orders[]> => {
      const res = await authorizedFetch(`${API_URL}/orders/mine`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Fetching user orders failed");
      return await res.json();
    },
  });
}

export function useGetOrderDetails(orderId: string) {
  return useQuery({
    queryKey: ["order-details", orderId],
    queryFn: async (): Promise<Orders> => {
      const res = await authorizedFetch(`${API_URL}/orders/${orderId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Fetching order details failed");
      return await res.json();
    },
    enabled: !!orderId,
  });
}

export function useGetAllOrdersByAdmin() {
  return useQuery({
    queryKey: ["all-orders"],
    queryFn: async (): Promise<Orders[]> => {
      const res = await authorizedFetch(`${API_URL}/orders/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Fetching all orders failed");
      return await res.json();
    },
  });
}
