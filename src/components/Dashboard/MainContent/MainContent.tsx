import { useEffect, useState } from "react";
import HistoryPayment from "../HistoryPayment/HistoryPayment";
import DashboardCard from "../DashboardCard/DashboardCard";
import { DateRange } from "react-day-picker";
import { CardItem, YearlyStat, ChartData } from "@/types/dashboard";
import { fetchCardData } from "@/services/dashboardService";
import YearlyRevenueChart from "../YearlyRevenueChart/YearlyRevenueChart";
import DailyRevenueChart from "../DailyRevenueChart/DailyRevenueChart";

interface MainContentProps {
  yearlyStat: YearlyStat[];
  revenueData: ChartData[];
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  year: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
}

const MainContent = ({
  yearlyStat,
  revenueData,
  date,
  setDate,
  year,
  setYear,
}: MainContentProps) => {
  const [cardData, setCardData] = useState<CardItem[]>([]);

  useEffect(() => {
    const loadCardData = async () => {
      const data = await fetchCardData();
      setCardData(data);
    };
    loadCardData();
  }, []);

  return (
    <main>
      <section>
        <div className="mt-10 flex flex-wrap justify-between gap-20">
          {cardData.map((data, index) => (
            <DashboardCard key={index} CardData={data} />
          ))}
        </div>
        <div className="mt-10 flex justify-between gap-2">
          <YearlyRevenueChart
            yearlyStat={yearlyStat}
            year={year}
            setYear={setYear}
          />
          <DailyRevenueChart
            revenueData={revenueData}
            date={date}
            setDate={setDate}
          />
        </div>
      </section>
      <HistoryPayment />
    </main>
  );
};

export default MainContent;
