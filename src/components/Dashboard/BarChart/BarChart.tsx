import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ChartData } from "chart.js";
import { yearlyStat } from "@/types/reservation";

// Đăng ký các thành phần của ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  yearlyStat: yearlyStat[];
}

const BarChart: React.FC<BarChartProps> = ({ yearlyStat }) => {
  const labels = yearlyStat.map((stat) => `Tháng ${stat.month}`);
  const dataValues = yearlyStat.map((stat) => stat.total);

  const chartConfig: ChartData<"bar"> = {
    labels,
    datasets: [
      {
        label: "Doanh thu (VNĐ)",
        data: dataValues,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        borderRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "Doanh thu theo tháng",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: false,
          text: "Số tiền (VNĐ)",
        },
        ticks: {
          maxTicksLimit: 4,
        },
      },
      x: {
        title: {
          display: false,
          text: "Tháng",
        },
      },
    },
  };

  return <Bar height={500} width={500} data={chartConfig} options={options} />;
};

export default BarChart;
