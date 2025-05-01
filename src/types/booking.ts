import { RoomBooking } from "./room";

export interface BookingType {
  documentId: string;
  room?: RoomBooking;
  guest_name: string | null;
  booking_date: string;
  reduction: number | null;
  checkin: string | null;
  checkout: string | null;
  prepayment: number | null;
  cccd: string | null | undefined;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  id: number;
  booking_status: BookingStatus;
  type: RoomType;
}

export interface CreateBookingData {
  data: {
    room: string;
    booking_date: string;
    checkin: string | null | undefined;
    booking_status: BookingStatus;
    guest_name: string;
  };
}

export interface UpdateBookingData {
  data: {
    room: string;
    guest_name: string | null;
    booking_date?: string | null;
    reduction: number | null;
    checkin: string | null | undefined;
    checkout: string | null | undefined;
    prepayment: number | null;
    cccd: string | null | undefined;
  };
}

export interface BookingData {
  data: BookingType;
}

export interface BookingFormData {
  room: string | null;
  guestName: string | null;
  cccd: string | null;
  prepayment: number | null;
  reduction: number | null;
  checkinDate: string | null;
  checkoutDate: string | null;
  booking_date: string | null;
  type: RoomType;
}

export interface CreateBookingPayload {
  room: string;
  guest_name: string | null;
  cccd?: string | null;
  prepayment?: number | null;
  reduction?: number | null;
  checkin: string | null;
  checkout?: string | null;
  booking_date?: string | null;
  type?: RoomType;
}

export enum RoomType {
  Hour = "Giờ",
  Overnight = "Qua Đêm",
  Day = "Ngày",
}

export enum BookingStatus {
  Cancelled = "Canceled",
  Completed = "Completed",
  Pending = "Pending",
}
