import { BookingType } from "./booking";
import { PaymentMethod } from "./payment";

export interface Reservation {
  id: number;
  documentId: string;
  date: string;
  amount: string;
  payment_method: string;
  note: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface yearlyStat {
  month: number;
  total: number;
  roomCount: number;
}

export interface dailyStat {
  date: string;
  total: number;
  roomCount: number;
}

export interface compareDaily {
  yesterdayTotal: number;
  todayTotal: number;
  percentageChange: number;
}

export interface RevenueData {
  id: number;
  documentId: string;
  date: string;
  amount: string;
  payment_method: PaymentMethod;
  note: null | string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  booking: BookingType;
}
