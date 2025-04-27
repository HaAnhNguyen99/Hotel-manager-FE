import { RoomType } from "./booking";
import { Image, Meta, Room } from "./hotel";

export enum RoomStatus {
  Available = "Available",
  Occupied = "Occupied",
  Cleaning = "Cleaning",
}

export interface FetchRoom {
  data: Room[];
  meta: Meta;
}

export interface RoomBooking {
  id: number;
  documentId: string;
  checkin: string;
  checkout: string | null;
  prepayment: number | null;
  reduction: number | null;
  booking_date: string | null;
  guest_name: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  publishedAt: string | null;
  cccd: string | null;
  booking_status: string;
  type: RoomType;
}

export interface Rooms {
  id: number;
  documentId: string;
  room_number: string;
  room_status: RoomStatus;
  floor: number;
  price_per_night: string;
  first_hourly_price: string;
  after_hour_price: string;
  note: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  img: Image;
}

export interface RoomsPayload {
  data: {
    id: string;
    room_number: number;
    room_status: RoomStatus;
    floor: number;
    price_per_night: number;
    first_hourly_price: number;
    after_hour_price: number;
    note?: string | null;
  };
}
