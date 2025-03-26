// src/components/Payment/paymentUtils.ts
import { calculateHours } from "@/utils/FormatDate";
import { calculateTotal } from "@/utils/calculateTotal";
import { UpdateServiceUsagePayload } from "@/types/service_usage";
import { Room } from "@/types/hotel";
import { PriceDetails } from "@/components/rooms/Payment/types";
import { BookingFormData } from "@/types/booking";
import { UseFormGetValues } from "react-hook-form";

export const calculatePriceDetails = (
  room: Room,
  serviceUsage: UpdateServiceUsagePayload[],
  getValues: UseFormGetValues<BookingFormData>
): PriceDetails => {
  const checkinTime = getValues("checkinDate");
  const checkoutTime = getValues("checkoutDate") || new Date().toISOString();
  const reduction = Number(getValues("reduction") || 0);
  const prePayment = Number(getValues("prepayment") || 0);
  const hours = checkinTime ? calculateHours(checkinTime, checkoutTime) : 0;
  const roomPrice =
    (hours - 1) * Number(room.after_hour_price) +
    Number(room.first_hourly_price);
  const servicePrice = calculateTotal(serviceUsage);
  const totalGeneral = roomPrice + servicePrice;
  const totalWithReduction = reduction
    ? totalGeneral - reduction
    : totalGeneral;
  const total = prePayment
    ? totalWithReduction - prePayment
    : totalWithReduction;

  return {
    hours,
    roomPrice,
    servicePrice,
    totalGeneral,
    reduction,
    prePayment,
    totalWithReduction,
    total,
  };
};
