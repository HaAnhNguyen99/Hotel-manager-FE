import {
  getCompareDailyRevenue,
  getDailyRevenue,
  getTodayRooms,
  getYearlyStat,
} from "@/services/hotelService";
import { ChartData, YearlyStat } from "@/types/dashboard";

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
  const data = await getTodayRooms();
  return data;
};
