import { getCardData } from "@/Pages/Dashboard/Dashboard.Data";
import {
  getCompareDailyRevenue,
  getDailyRevenue,
  getTodayRooms,
  getYearlyStat,
} from "@/services/hotelService";
import { ChartData, CompareDaily, YearlyStat } from "@/types/dashboard";

export const fetchDashboardData = async () => {
  const [yearlyStat, compareRevenue] = await Promise.all([
    getYearlyStat(),
    getCompareDailyRevenue(),
  ]);
  return { yearlyStat, compareRevenue };
};

export const fetchDailyRevenue = async (
  from: Date,
  to: Date
): Promise<ChartData[]> => {
  return getDailyRevenue(from, to);
};

export const fetchYearlyData = async (year: number): Promise<YearlyStat[]> => {
  return getYearlyStat(year);
};

export const fetchCardData = async () => {
  const todayData = await getTodayRooms();
  return getCardData(todayData);
};
