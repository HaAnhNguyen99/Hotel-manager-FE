import { Meta, Room } from './hotel';

export enum RoomStatus {
  Available = 'Available',
  Occupied = 'Occupied',
  Cleaning = 'Cleaning',
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
  type: object;
}
