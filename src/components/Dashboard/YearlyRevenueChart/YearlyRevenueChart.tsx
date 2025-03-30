import { YearlyStat } from "@/types/dashboard";
import YearPicker from "../YearPicker/YearPicker";
import BarChart from "../BarChart/BarChart";

interface YearlyRevenueChartProp {
  yearlyStat: YearlyStat[];
  year: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
}

const YearlyRevenueChart = ({
  yearlyStat,
  year,
  setYear,
}: YearlyRevenueChartProp) => {
  return (
    <div className="card-shadow w-full">
      <div className="flex justify-between mb-5">
        <p className="text-xl font-bold leading-6 text-black whitespace-nowrap">
          Doanh thu theo năm
        </p>
        <YearPicker selectedYear={year} onYearChange={setYear} />
      </div>
      <BarChart yearlyStat={yearlyStat} />
    </div>
  );
};

export default YearlyRevenueChart;
