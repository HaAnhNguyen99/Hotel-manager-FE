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
    <div className="card-shadow w-1/4 pt-9 bg-shadow-mode ">
      <div className="flex justify-between mb-10">
        <p className="card-header">Doanh thu theo năm</p>
        <YearPicker selectedYear={year} onYearChange={setYear} />
      </div>
      <div className="h-52">
        <BarChart yearlyStat={yearlyStat} />
      </div>
    </div>
  );
};

export default YearlyRevenueChart;
