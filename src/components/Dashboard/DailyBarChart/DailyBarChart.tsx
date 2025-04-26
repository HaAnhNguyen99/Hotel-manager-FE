import React from "react";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  BarController,
} from "chart.js";
import { chartOption } from "./option";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  LineController,
  BarController,
  Title,
  Tooltip,
  Legend
);

export interface DataPoint {
  date: string;
  total: number;
  roomCount: number;
}

export interface DailyBarChartProps {
  data: DataPoint[];
}

export const DailyBarChart: React.FC<DailyBarChartProps> = ({ data }) => {
  const { chartData, options } = chartOption({ data });

  return (
    <Chart
      width={undefined}
      height={undefined}
      type="bar"
      data={chartData}
      options={options}
    />
  );
};

export default DailyBarChart;
