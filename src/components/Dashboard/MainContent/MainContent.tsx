import React from "react";
import YearPicker from "../YearPicker/YearPicker";
import Overview from "../Overview/Overview";
import { DatePickerWithRange } from "../DateRangePicker/DateRangePicker";
import DailyBarChart from "../DailyBarChart/DailyBarChart";
import HistoryPayment from "../HistoryPayment/HistoryPayment";
import BarChart from "../BarChart/BarChart";
import DashboardCard, {
  DashboardCardProps,
} from "../DashboardCard/DashboardCard";

interface YearlyStat {
  month: number;
  total: number;
  roomCount: number;
}

interface OverviewData {
  title: string;
  value: number | string | undefined;
}

interface RevenueData {
  date: string;
  total: number;
  roomCount: number;
}

interface DateRange {
  from: Date | undefined;
  to?: Date;
}

interface MainContentProps {
  yearlyStat: YearlyStat[];
  overviewData: OverviewData[];
  revenueData: RevenueData[];
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  year: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  cardData: DashboardCardProps[];
}

const MainContent = ({
  yearlyStat,
  overviewData,
  revenueData,
  date,
  setDate,
  year,
  setYear,
  cardData,
}: MainContentProps) => {
  return (
    <main>
      <section>
        <div className="flex gap-20 justify-between flex-wrap mt-10">
          
          {cardData.map((data, index) => (
            <DashboardCard key={index} CardData={data} />
          ))}
        </div>
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

      <HistoryPayment />
    </main>
  );
};

export default MainContent;
