// src/components/Payment/paymentUtils.ts
import { calculateHours } from "@/utils/FormatDate";
import { calculateTotal } from "@/utils/calculateTotal";
import { Room, PriceDetails } from "./types";

export const calculatePriceDetails = (
  room: Room,
  serviceUsage: any[],
  getValues: any
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
