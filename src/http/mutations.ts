import { useMutation } from "@tanstack/react-query";
import { authorizedFetch } from "./queryClient";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4009/api";

// Login
export function useLogin() {
  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await authorizedFetch(`${API_URL}/users/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Login failed");
      return await res.json();
    },
  });
}

// Register
export function useRegister() {
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      password: string;
    }) => {
      const res = await authorizedFetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Register failed");
      return await res.json();
    },
  });
}

// Add Product
export function useAddProduct() {
  return useMutation({
    mutationFn: async (data: FormData) => {
      const res = await authorizedFetch(`${API_URL}/products`, {
        method: "POST",
        body: data, // FormData
      });
      if (!res.ok) throw new Error("Add product failed");
      return await res.json();
    },
  });
}
