import { getReservationsFromDate } from "@/services/hotelService";
import { calculateTotalRooms } from "./calculateTotalRooms";

interface Reservation {
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

export enum DateType {
  SEVEN_DAYS = "7_days",
  DAY = "day",
}

export const handleDate = (
  dateType: DateType
): { startDate: string; endDate: string } | undefined => {
  const today = new Date();

  // 7 Days
  if (dateType === DateType.SEVEN_DAYS) {
    const startDate = today.toISOString().split("T")[0] + "T00:00:00.000Z";
    const past7Days = new Date();
    past7Days.setDate(today.getDate() - 6);
    const endDate = past7Days.toISOString().split("T")[0] + "T23:59:59.999Z";
    return { startDate, endDate };
  }

  // Day
  if (dateType === DateType.DAY) {
    const endDate = today.toISOString().split("T")[0] + "T00:00:00.000Z";
    const startDate = today.toISOString().split("T")[0] + "T23:59:59.999Z";
    return { startDate, endDate };
  }
};

export const calculateTotalAmount = async (
  dateType: DateType
): Promise<{ TotalAmout: string; TotalRooms: number }> => {
  const date = handleDate(dateType);

  if (!date) {
    return { TotalAmout: "0", TotalRooms: 0 };
  }

  const { startDate, endDate } = date;
  const reservations = await getReservationsFromDate(endDate, startDate);

  const total = reservations.data.reduce(
    (total: number, reservation: Reservation) => {
      const amount = parseInt(reservation.amount, 10);
      return total + (isNaN(amount) ? 0 : amount);
    },
    0
  );

  const TotalRooms = calculateTotalRooms(reservations.data);
  console.log(TotalRooms);

  const TotalAmout = total.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return { TotalAmout, TotalRooms };
};
