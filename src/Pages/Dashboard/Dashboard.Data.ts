import { Bed, CircleDollarSign } from "lucide-react";

export const getCardData = (total7Days: number, totalRooms7Days: string) => [
  {
    title: "Tổng lợi nhuận",
    value: total7Days,
    icon: CircleDollarSign,
    day: "7 ngày",
    profit: -20,
    color: "bg-zinc-700",
    foreground: "bg-zinc-100",
    textColor: "text-white",
    iconColor: "black",
  },
  {
    title: "Tổng số phòng",
    value: totalRooms7Days,
    icon: Bed,
    day: "7 ngày",
    profit: 10,
    color: "bg-gray-200",
    foreground: "bg-neutral-500",
    iconColor: "white",
  },
];
