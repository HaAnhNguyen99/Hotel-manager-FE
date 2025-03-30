import { useEffect, useState } from "react";
import { getCardData } from "./Dashboard.Data";
import { compareDaily, dailyStat, yearlyStat } from "@/types/reservation";
import {
  getCompareDailyRevenue,
  getDailyRevenue,
  getYearlyStat,
} from "@/services/hotelService";
import { DateRange } from "react-day-picker";
import Header from "@/components/Dashboard/Header/Header";
import MainContent from "@/components/Dashboard/MainContent/MainContent";

interface ChartData {
  date: string;
  total: number;
  roomCount: number;
}

type DailyStat = {
  date: string;
  total: number;
  roomCount: number;
};

const calculateStats = (dailyStats: DailyStat[] | undefined) => {
  if (!dailyStats) {
    return { total7Days: 0, totalRooms7Days: 0 };
  }
  // Chỉ lấy 7 ngày gần nhất
  const last7Days = dailyStats.slice(-7);

  // Tính tổng doanh thu
  const total7Days = last7Days.reduce((sum, stat) => sum + stat.total, 0);

  // Đếm số phòng (chính là số lượng phần tử trong mảng)
  const totalRooms7Days = last7Days.length;

  return { total7Days, totalRooms7Days };
};

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
  const [dailyStat, setDailyStat] = useState<dailyStat[]>();
  const [compareRevenue, setCompareRevenue] = useState<compareDaily>({
    yesterdayTotal: 0,
    todayTotal: 0,
    percentageChange: 0,
  });

  useEffect(() => {
    const fetchRevenueData = async () => {
      const YearlyStat = await getYearlyStat();
      const DailyStat = await getDailyRevenue();
      const compareRevenue = await getCompareDailyRevenue();

      setYearlyStat(YearlyStat);
      setDailyStat(DailyStat);
      setRevenueData(DailyStat);
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

  const { total7Days, totalRooms7Days } = calculateStats(dailyStat);

  const cardData = getCardData(
    total7Days,
    totalRooms7Days.toLocaleString("de-DE")
  );

  const TotalDayAmout = dailyStat?.reduce((prev, cur) => {
    return prev + cur.total;
  }, 0);

  const TotalDayCount = dailyStat?.reduce((prev) => {
    return (prev += 1);
  }, 0);

  const overviewData = [
    { title: "Phòng", value: TotalDayCount },
    {
      title: "Tổng thu",
      value: TotalDayAmout?.toLocaleString("de-DE"),
    },
  ];

  return (
    <div className="p-4 px-10">
      <Header compareRevenue={compareRevenue}  />
      <MainContent
        yearlyStat={yearlyStat}
        overviewData={overviewData}
        revenueData={revenueData}
        date={date}
        setDate={setDate}
        year={year}
        setYear={setYear}
        cardData={cardData}
      />
    </div>
  );
};

export default Dashboard;
