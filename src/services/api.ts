import axios from "axios";
import {
  User,
  Item,
  Purchase,
  CreateUserPayload,
  UpdateUserPayload,
  CreateItemPayload,
  UpdateItemPayload,
  CreatePurchasePayload,
  ItemCategory,
  ItemStatus,
} from "../types";

// Configure baseURL - change this to your API URL
const API_BASE_URL = API_URL || "http://192.168.18.10:3000";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 segundos
});

// Adicionar token JWT automaticamente em todas as requisições
export function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
}

// Auth endpoints
export interface AuthResponse {
  access_token: string;
  user: User;
}

export async function login(email: string): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/auth/login", { email });
  return response.data;
}

export async function register(payload: CreateUserPayload): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/auth/register", payload);
  return response.data;
}

export async function validateToken(): Promise<{ valid: boolean; userId: string; email: string }> {
  const response = await api.post("/auth/validate");
  return response.data;
}

export async function deleteAccount(): Promise<void> {
  await api.delete("/auth/account");
}

// User endpoints
export async function createUser(payload: CreateUserPayload): Promise<User> {
  try {
    console.log('🚀 Creating user with payload:', payload);
    console.log('📡 API URL:', `${API_BASE_URL}/users`);
    const response = await api.post<User>("/users", payload);
    console.log('✅ User created successfully:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ Error creating user:');
    console.error('URL:', `${API_BASE_URL}/users`);
    console.error('Payload:', payload);
    console.error('Status:', error.response?.status);
    console.error('Error message:', error.message);
    console.error('Response data:', error.response?.data);
    throw error;
  }
}

export async function getUser(id: string): Promise<User> {
  const response = await api.get<User>(`/users/${id}`);
  return response.data;
}

export async function updateUser(
  id: string,
  payload: UpdateUserPayload,
): Promise<User> {
  const response = await api.patch<User>(`/users/${id}`, payload);
  return response.data;
}

// Item endpoints
export async function getItems(params: {
  userId: string;
  category?: ItemCategory;
  status?: ItemStatus;
}): Promise<Item[]> {
  const response = await api.get<Item[]>("/items", { params });
  return response.data;
}

export async function getItem(id: string): Promise<Item> {
  const response = await api.get<Item>(`/items/${id}`);
  return response.data;
}

export async function createItem(payload: CreateItemPayload): Promise<Item> {
  const response = await api.post<Item>("/items", payload);
  return response.data;
}

export async function updateItem(
  id: string,
  payload: UpdateItemPayload,
): Promise<Item> {
  const response = await api.patch<Item>(`/items/${id}`, payload);
  return response.data;
}

export async function deleteItem(id: string): Promise<void> {
  await api.delete(`/items/${id}`);
}

// Purchase endpoints
export async function createPurchase(
  itemId: string,
  payload: CreatePurchasePayload,
): Promise<Purchase> {
  const response = await api.post<Purchase>(
    `/items/${itemId}/purchases`,
    payload,
  );
  return response.data;
}

export async function getPurchases(itemId: string): Promise<Purchase[]> {
  const response = await api.get<Purchase[]>(`/items/${itemId}/purchases`);
  return response.data;
}

export default api;
