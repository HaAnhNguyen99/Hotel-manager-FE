import DashboardCard from "@/components/Dashboard/DashboardCard/DashboardCard";
import Search from "@/components/Dashboard/Search/Search";
import { calculateTotalAmount, DateType } from "@/utils/calculateTotalAmount";
import { useEffect, useState } from "react";
import { getCardData } from "./Data";

const Dashboard = () => {
  const [total7Days, setTotal7Days] = useState<string>("0");
  const [totalDay, setTotalDay] = useState<string>("0");
  const [totalRooms7Days, setTotalRooms7Days] = useState<string>("");
  const [totalRoomsDays, setTotalRoomsDays] = useState<string>("");

  useEffect(() => {
    const GetTotalFromDate = async () => {
      const Total7Days = await calculateTotalAmount(DateType.SEVEN_DAYS);
      const TotalDay = await calculateTotalAmount(DateType.DAY);

      setTotal7Days(Total7Days.TotalAmout);
      setTotalRooms7Days(Total7Days.TotalRooms.toString() + " phòng");
      setTotalDay(TotalDay.TotalAmout);
      setTotalRoomsDays(TotalDay.TotalRooms.toString() + " phòng");
    };

    GetTotalFromDate();
  }, []);

  const cardData = getCardData(
    total7Days,
    totalRooms7Days,
    totalDay,
    totalRoomsDays
  );

  return (
    <div>
      <div>
        <Search />
      </div>
      <div className="flex gap-2 justify-between flex-wrap mt-10 max-w-[80%] mx-auto">
        {cardData.map((data, index) => (
          <DashboardCard key={index} CardData={data} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
