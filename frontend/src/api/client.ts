import axios from "axios";
export const api = axios.create({
  baseURL: "http://localhost:5226",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});



export type ApiResponse<T> = {
  status: "success" | "error";
  data?: T;
  error?: string;
};
