import { calculateHours } from "@/utils/FormatDate";
import { calculateTotal } from "@/utils/calculateTotal";
import { UpdateServiceUsagePayload } from "@/types/service_usage";
import { Room } from "@/types/hotel";
import { PriceDetails } from "@/components/rooms/Payment/types";
import { BookingFormData, RoomType } from "@/types/booking";
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

  let roomPrice = 0;

  if (getValues("type") === RoomType.Overnight) {
    const checkoutDate = new Date(checkoutTime);
    const nextDayNoon = new Date(checkinTime);
    nextDayNoon.setDate(nextDayNoon.getDate() + 1);
    nextDayNoon.setHours(12, 0, 0, 0);

    if (checkoutDate > nextDayNoon) {
      const extraHours = Math.ceil(
        (checkoutDate.getTime() - nextDayNoon.getTime()) / (1000 * 60 * 60)
      );
      roomPrice = Number(room.price_per_night) + extraHours * 20000;
    } else {
      roomPrice = Number(room.price_per_night);
    }
  } else {
    roomPrice =
      (hours - 1) * Number(room.after_hour_price) +
      Number(room.first_hourly_price);
  }

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
