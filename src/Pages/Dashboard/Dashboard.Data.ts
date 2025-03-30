import { Bed, CircleDollarSign } from "lucide-react";

export const getCardData = (total7Days: number, totalRooms7Days: string) => [
  {
    title: "Tổng số phòng",
    value: totalRooms7Days,
    icon: Bed,
  },
  {
    title: "Tổng lợi nhuận",
    value: total7Days,
    icon: CircleDollarSign,
    iconColor: "pink",
  },
  {
    title: "Phòng giờ",
    value: totalRooms7Days,
    icon: Bed,
  },
  {
    title: "Phòng qua đêm",
    value: totalRooms7Days,
    icon: Bed,
  },
];
