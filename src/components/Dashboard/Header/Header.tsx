import { Badge } from "@/components/ui/badge";
import { ChevronsDown, ChevronsUp } from "lucide-react";
import HotelInfo from "../HotelInfo/HotelInfo";

interface HeaderProps {
  compareRevenue: {
    todayTotal: number;
    yesterdayTotal: number;
    percentageChange: number;
  };
}
const Header = ({ compareRevenue }: HeaderProps) => {
  const todayTotal = compareRevenue.todayTotal;

  return (
    <header className="flex gap-4 justify-between items-center">
      <div>
        <h3 className="text-sm font-bold">Lợi nhuận hôm nay</h3>
        <div className="flex gap-4 mt-2">
          <p className="text-2xl font-extrabold leading-tight">
            $
            {todayTotal.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </p>
          <Badge
            variant="secondary"
            className={`flex gap-1 w-fit rounded-xl hover:bg-black hover:text-white transition-all  ${
              compareRevenue.percentageChange > 0
                ? "bg-blue text-green"
                : "bg-red-400 text-white"
            }`}>
            {compareRevenue.percentageChange > 0 ? (
              <ChevronsUp />
            ) : (
              <ChevronsDown />
            )}
            <p className="font-bold">{compareRevenue.percentageChange}%</p>
          </Badge>
        </div>
      </div>
      <HotelInfo />
    </header>
  );
};

export default Header;
