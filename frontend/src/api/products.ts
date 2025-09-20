import { api } from "./client";
import type { ApiResponse } from "./client";

export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
};

export type PagedResult<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
};

export async function getProducts(params: { search?: string; page?: number; pageSize?: number }) {
  const res = await api.get<ApiResponse<PagedResult<Product>>>("/api/products", { params });
  if (res.data.status === "error") throw new Error(res.data.error);
  return res.data.data!;
}

export async function createProduct(input: Omit<Product, "id">) {
  const res = await api.post<ApiResponse<Product>>("/api/products", input);
  if (res.data.status === "error") throw new Error(res.data.error);
  return res.data.data!;
}

export async function updateProduct(id: number, input: Omit<Product, "id">) {
  const res = await api.put<ApiResponse<{ updated: boolean }>>(`/api/products/${id}`, input);
  if (res.data.status === "error") throw new Error(res.data.error);
  return res.data.data!;
}

export async function deleteProduct(id: number) {
  const res = await api.delete<ApiResponse<{ deleted: boolean }>>(`/api/products/${id}`);
  if (res.data.status === "error") throw new Error(res.data.error);
  return res.data.data!;
}
