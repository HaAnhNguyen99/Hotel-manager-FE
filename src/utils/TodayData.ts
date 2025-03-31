import { RoomType } from "@/types/booking";
import { RevenueData } from "@/types/reservation";

export const TodayData = (TodayData: RevenueData[]) => {
  const TodayHourRoom = TodayData.filter(
    (x) => x.booking.type === RoomType.Hour
  );

  const TodayOvernightRoom = TodayData.filter(
    (x) => x.booking.type === RoomType.Overnight
  );

  const totalRevenue = TodayData.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const totalRooms = TodayData.length;
  return {
    todayHourRoom: TodayHourRoom.length,
    todayOvernightRoom: TodayOvernightRoom.length,
    totalRevenue,
    totalRooms,
  };
};
