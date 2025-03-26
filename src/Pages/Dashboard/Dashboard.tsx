import { ChevronsUp, ChevronsDown } from "lucide-react";
import DashboardCard from "@/components/Dashboard/DashboardCard/DashboardCard";
import { useEffect, useState } from "react";
import { getCardData } from "./Dashboard.Data";
import { compareDaily, dailyStat, yearlyStat } from "@/types/reservation";
import BarChart from "@/components/Dashboard/BarChart/BarChart";
import DailyBarChart from "@/components/Dashboard/DailyBarChart/DailyBarChart";
import { Badge } from "@/components/ui/badge";
import {
  getCompareDailyRevenue,
  getDailyRevenue,
  getYearlyStat,
} from "@/services/hotelService";
import Overview from "@/components/Dashboard/Overview/Overview";
import HistoryPayment from "@/components/Dashboard/HistoryPayment/HistoryPayment";
import YearPicker from "@/components/Dashboard/YearPicker/YearPicker";
import { DatePickerWithRange } from "@/components/Dashboard/DateRangePicker/DateRangePicker";
import { DateRange } from "react-day-picker";
import DashboardHeader from "@/components/Dashboard/DashboardHeader/DashboardHeader";

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
      console.log(res);
    };
    fetchDailyStat();
  }, [date]);

  useEffect(() => {
    const fetchYearData = async () => {
      const res = await getYearlyStat(year);
      setYearlyStat(res);
      console.log(res);
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

  console.log(date);

  return (
    <div className="p-4 px-10">
      <DashboardHeader />
      <section>
        <div className="flex gap-2 mt-10">
          <div>
            <h3 className="text-sm font-bold">Tổng thu</h3>
            <div className="flex gap-2">
              <p className="text-2xl font-extrabold">
                ${compareRevenue.todayTotal}
              </p>
              <Badge
                variant="outline"
                className={`flex gap-1 w-fit rounded-xl text-white ${
                  compareRevenue.percentageChange > 0
                    ? "bg-green-400"
                    : "bg-red-400"
                }`}>
                {compareRevenue.percentageChange > 0 ? (
                  <ChevronsUp />
                ) : (
                  <ChevronsDown />
                )}
                <p className="font-bold">{compareRevenue.percentageChange}%</p>
              </Badge>
            </div>
            <div className="text-sm">
              <span>
                So với hôm qua -{" "}
                <span className="font-bold">
                  ${compareRevenue.yesterdayTotal}
                </span>
              </span>
            </div>
          </div>
          <div className="flex gap-2 justify-around flex-wrap w-full">
            {cardData.map((data, index) => (
              <DashboardCard key={index} CardData={data} />
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="flex gap-2 justify-around mt-10">
          <div>
            <YearPicker selectedYear={year} onYearChange={setYear} />
            <BarChart yearlyStat={yearlyStat} />
          </div>
          <div className="flex gap-10">
            <div className="space-y-2">
              {overviewData.map((overviewData, index) => (
                <Overview
                  key={index}
                  title={overviewData.title}
                  value={overviewData.value}
                />
              ))}
            </div>
            <div className=" p-2 rounded-lg">
              <DatePickerWithRange date={date} setDate={setDate} />
              <DailyBarChart data={revenueData} />
            </div>
          </div>
        </div>
      </section>
      <section>
        <HistoryPayment />
      </section>
    </div>
  );
};

export default Dashboard;
