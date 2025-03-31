import { DatePickerWithRange } from "../DateRangePicker/DateRangePicker";
import DailyBarChart from "../DailyBarChart/DailyBarChart";
import { DateRange } from "react-day-picker";
import { ChartData } from "@/types/dashboard";

interface DailyRevenueChartProps {
  revenueData: ChartData[];
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}
const DailyRevenueChart = ({
  revenueData,
  date,
  setDate,
}: DailyRevenueChartProps) => {
  return (
    <div className="card-shadow flex-1 w-2/4 h-full">
      <div className="rounded-lg p-2 h-full">
        <div className="flex justify-between mb-10">
          <p className="card-header">Doanh thu ngày</p>
          <DatePickerWithRange date={date} setDate={setDate} />
        </div>
        <div className="h-52 w-full">
          <DailyBarChart data={revenueData} />
        </div>
      </div>
    </div>
  );
};

export default DailyRevenueChart;
