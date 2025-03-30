import { Bed, CircleDollarSign } from "lucide-react";

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
      icon: Bed,
    },
    {
      title: "Tổng lợi nhuận",
      value: Revenue,
      icon: CircleDollarSign,
      iconColor: "pink",
    },
    {
      title: "Phòng giờ",
      value: todayHourRoom,
      icon: Bed,
    },
    {
      title: "Phòng qua đêm",
      value: todayOvernightRoom,
      icon: Bed,
    },
  ];
};
