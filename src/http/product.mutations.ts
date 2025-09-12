/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery } from "@tanstack/react-query";
import { authorizedFetch } from "./queryClient";
import type {
  CategoryResponse,
  CategoryType,
  ImageUploadResponse,
  ProductResponse,
} from "../types/product.types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4009/api";

// Add Product
export function useAddProduct() {
  return useMutation({
    mutationFn: async (data: FormData) => {
      const res = await authorizedFetch(`${API_URL}/products`, {
        method: "POST",
        body: data, // FormData
      });
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Add product failed:", errorText);
        throw new Error("Add product failed: " + errorText);
      }
      return await res.json();
    },
  });
}

export function useGetAllCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async (): Promise<CategoryResponse[]> => {
      const res = await authorizedFetch(`${API_URL}/category/categories`, {
        method: "GET",
      });
      if (!res.ok) throw new Error("Fetching categories failed");
      const data = await res.json(); // parse once

      return data;
    },
  });
}

export function useAddCategory() {
  return useMutation({
    mutationFn: async (data: CategoryType): Promise<CategoryResponse> => {
      const res = await authorizedFetch(`${API_URL}/category`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Add product failed:", errorText);
        throw new Error("Add product failed: " + errorText);
      }
      return await res.json();
    },
  });
}

export function useUploadImage() {
  return useMutation({
    mutationFn: async (data: FormData): Promise<ImageUploadResponse> => {
      const res = await authorizedFetch(`${API_URL}/upload`, {
        method: "POST",
        body: data, // FormData
      });
      if (!res.ok) throw new Error("Add product image");
      return await res.json();
    },
  });
}

export function useGetProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<ProductResponse[]> => {
      const res = await authorizedFetch(`${API_URL}/products/allproducts`, {
        method: "GET",
      });
      if (!res.ok) throw new Error("Fetching products failed");
      return await res.json();
    },
  });
}

export function useGetProductById(productId: string) {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: async (): Promise<ProductResponse> => {
      const res = await authorizedFetch(`${API_URL}/products/${productId}`, {
        method: "GET",
      });
      if (!res.ok) throw new Error("Fetching product failed");
      return await res.json();
    },
    enabled: !!productId, // Only run this query if productId is truthy
  });
}

export function useDeleteProduct() {
  return useMutation({
    mutationFn: async (productId: string) => {
      const res = await authorizedFetch(
        `${API_URL}/products/deleteproduct/${productId}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Delete product failed:", errorText);
        throw new Error("Delete product failed: " + errorText);
      }
      return await res.json();
    },
  });
}
