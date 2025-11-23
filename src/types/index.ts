export type ThemeMode = "dark" | "light";

export type ItemStatus = "EM_DIA" | "ACABANDO" | "EM_FALTA";

export type ItemCategory =
  | "PET"
  | "MEDICAMENTO_CONTROLADO"
  | "MEDICAMENTO"
  | "CASA";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  notificationTime: string;
  themePreference: ThemeMode;
  createdAt: string;
  updatedAt: string;
}

export interface Item {
  id: string;
  userId: string;
  name: string;
  category: ItemCategory;
  unit: string;
  quantityTotal: number;
  dailyConsumption: number;
  startDate: string;
  leadTimeDays: number;
  needsPrescription: boolean;
  prescriptionLeadDays?: number | null;
  createdAt: string;
  updatedAt: string;
  remainingQuantity?: number;
  daysRemaining?: number;
  status?: ItemStatus;
}

export interface Purchase {
  id: string;
  itemId: string;
  quantity: number;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  phone?: string;
  notificationTime: string;
  themePreference?: ThemeMode;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  phone?: string;
  notificationTime?: string;
  themePreference?: ThemeMode;
}

export interface CreateItemPayload {
  userId: string;
  name: string;
  category: ItemCategory;
  unit: string;
  quantityTotal: number;
  dailyConsumption: number;
  startDate: string;
  leadTimeDays: number;
  needsPrescription: boolean;
  prescriptionLeadDays?: number | null;
}

export interface UpdateItemPayload {
  name?: string;
  category?: ItemCategory;
  unit?: string;
  quantityTotal?: number;
  dailyConsumption?: number;
  startDate?: string;
  leadTimeDays?: number;
  needsPrescription?: boolean;
  prescriptionLeadDays?: number | null;
}

export interface CreatePurchasePayload {
  quantity: number;
  date: string;
}
