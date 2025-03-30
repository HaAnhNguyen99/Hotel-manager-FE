import { useEffect, useState } from "react";
import { compareDaily, yearlyStat } from "@/types/reservation";
import {
  getCompareDailyRevenue,
  getDailyRevenue,
  getYearlyStat,
} from "@/services/hotelService";
import { DateRange } from "react-day-picker";
import Header from "@/components/Dashboard/Header/Header";
import MainContent from "@/components/Dashboard/MainContent/MainContent";
import { ChartData } from "@/types/dashboard";

const Dashboard = () => {
  const [revenueData, setRevenueData] = useState<ChartData[]>([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(new Date().setHours(23, 59, 59, 999)),
  });
  const [yearlyStat, setYearlyStat] = useState<yearlyStat[]>([
    {
      month: 0,
      total: 0,
      roomCount: 0,
    },
  ]);
  const [compareRevenue, setCompareRevenue] = useState<compareDaily>({
    yesterdayTotal: 0,
    todayTotal: 0,
    percentageChange: 0,
  });

  useEffect(() => {
    const fetchRevenueData = async () => {
      const YearlyStat = await getYearlyStat();
      const compareRevenue = await getCompareDailyRevenue();

      setYearlyStat(YearlyStat);
      setCompareRevenue(compareRevenue);
    };

    fetchRevenueData();
  }, []);

  useEffect(() => {
    const fetchDailyStat = async () => {
      if (!date || !date.from || !date.to) {
        return;
      }

      const res = await getDailyRevenue(date.from, date.to);
      setRevenueData(res);
    };
    fetchDailyStat();
  }, [date]);

  useEffect(() => {
    const fetchYearData = async () => {
      const res = await getYearlyStat(year);
      setYearlyStat(res);
    };
    fetchYearData();
  }, [year]);

  return (
    <div className="p-4 px-10">
      <Header compareRevenue={compareRevenue} />
      <MainContent
        yearlyStat={yearlyStat}
        revenueData={revenueData}
        date={date}
        setDate={setDate}
        year={year}
        setYear={setYear}
      />
    </div>
  );
};

export default Dashboard;
