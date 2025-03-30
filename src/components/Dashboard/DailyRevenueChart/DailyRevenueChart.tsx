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
    <div className="flex gap-10">
      <div className="rounded-lg p-2">
        <DatePickerWithRange date={date} setDate={setDate} />
        <DailyBarChart data={revenueData} />
      </div>
    </div>
  );
};

export default DailyRevenueChart;
