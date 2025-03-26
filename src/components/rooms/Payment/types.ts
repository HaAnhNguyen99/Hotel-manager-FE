import { Room as OriginalRoom } from "@/types/hotel";
import { PaymentMethod } from "@/types/payment";

export interface Room extends OriginalRoom {
  documentId: string;
}

export interface PaymentProps {
  room: Room;
  bookingId: string;
  setCardOpen: (open: boolean) => Promise<void>;
}

export interface PriceDetails {
  hours: number;
  roomPrice: number;
  servicePrice: number;
  totalGeneral: number;
  reduction: number;
  prePayment: number;
  totalWithReduction: number;
  total: number;
}

export { PaymentMethod };
