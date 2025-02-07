export interface BookingType {
  documentId: string;
  room: string;
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
}

export interface CreateBookingData {
  data: {
    room: string;
    guest_name: string | null;
    booking_date: string;
    reduction: number | null;
    checkin: string | null | undefined;
    checkout: string | null | undefined;
    prepayment: number | null;
    cccd: string | null | undefined;
  };
}

export interface UpdateBookingData {
  data: {
    room: string;
    guest_name: string | null;
    booking_date: string;
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
  guestName: string | null;
  cccd: string | null;
  prepayment: number | null;
  reduction: number | null;
  checkinDate: string | null;
  checkoutDate: string | null;
  booking_date: string;
}
