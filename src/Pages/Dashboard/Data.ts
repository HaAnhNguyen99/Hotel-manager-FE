import { Bed, CircleDollarSign, Banknote } from "lucide-react";

export const getCardData = (
  total7Days: string,
  totalRooms7Days: string,
  totalDay: string,
  totalRoomsDays: string
) => [
  {
    title: "Tổng lợi nhuận",
    value: total7Days,
    icon: CircleDollarSign,
    day: "7 ngày",
    profit: -20,
    color: "bg-green-100",
    foreground: "bg-green-700",
  },
  {
    title: "Tổng số phòng",
    value: totalRooms7Days,
    icon: Bed,
    day: "7 ngày",
    profit: 10,
    color: "bg-lime-100",
    foreground: "bg-lime-700",
  },
  {
    title: "Tổng thu ngày",
    value: totalDay,
    icon: Banknote,
    day: "1 ngày",
    profit: -20,
    color: "bg-teal-100",
    foreground: "bg-teal-700",
  },
  {
    title: "Tổng phòng ngày",
    value: totalRoomsDays,
    icon: Bed,
    day: "1 ngày",
    profit: 50,
    color: "bg-sky-100",
    foreground: "bg-sky-700",
  },
];
