import { useEffect, useState } from "react";
import YearPicker from "../YearPicker/YearPicker";
import { DatePickerWithRange } from "../DateRangePicker/DateRangePicker";
import DailyBarChart from "../DailyBarChart/DailyBarChart";
import HistoryPayment from "../HistoryPayment/HistoryPayment";
import BarChart from "../BarChart/BarChart";
import DashboardCard from "../DashboardCard/DashboardCard";
import { DateRange } from "react-day-picker";
import { CardItem, YearlyStat, ChartData } from "@/types/dashboard";
import { fetchCardData } from "@/services/dashboardService";

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
        <div className="mt-10 flex justify-around gap-2">
          <div>
            <YearPicker selectedYear={year} onYearChange={setYear} />
            <BarChart yearlyStat={yearlyStat} />
          </div>
          <div className="flex gap-10">
            <div className="rounded-lg p-2">
              <DatePickerWithRange date={date} setDate={setDate} />
              <DailyBarChart data={revenueData} />
            </div>
          </div>
        </div>
      </section>
      <HistoryPayment />
    </main>
  );
};

export default MainContent;
