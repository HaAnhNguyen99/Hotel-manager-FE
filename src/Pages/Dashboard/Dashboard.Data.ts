import {
  Bed,
  CalendarCheck,
  CalendarClock,
  CircleDollarSign,
} from "lucide-react";

interface TodayData {
  todayHourRoom: number;
  todayOvernightRoom: number;
  totalRevenue: number;
  totalRooms: number;
}

export const getCardData = ({
  todayHourRoom,
  todayOvernightRoom,
  totalRevenue,
  totalRooms,
}: TodayData) => {
  const Revenue = totalRevenue.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return [
    {
      title: "Tổng số phòng",
      value: totalRooms,
      icon: CalendarCheck,
    },
    {
      title: "Tổng lợi nhuận",
      value: Revenue,
      icon: CircleDollarSign,
    },
    {
      title: "Phòng giờ",
      value: todayHourRoom,
      icon: CalendarClock,
    },
    {
      title: "Phòng qua đêm",
      value: todayOvernightRoom,
      icon: Bed,
    },
  ];
};
