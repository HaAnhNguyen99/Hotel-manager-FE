import React from "react";
import { Chart } from "react-chartjs-2"; // Changed from Line to Chart
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
  ChartOptions,
  ChartData,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DataPoint {
  date: string;
  total: number;
  roomCount: number;
}

interface DailyBarChartProps {
  data: DataPoint[];
}

const DailyBarChart: React.FC<DailyBarChartProps> = ({ data }) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
    });
  };

  // Specify the chart data type explicitly
  const chartData: ChartData<"bar" | "line"> = {
    labels: data.map((item) => formatDate(item.date)),
    datasets: [
      {
        type: "line" as const,
        label: "Tổng",
        data: data.map((item) => item.total),
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        yAxisID: "y",
        tension: 0.3,
      },
      {
        type: "bar" as const,
        label: "Số phòng",
        data: data.map((item) => item.roomCount),
        borderColor: "#2196F3",
        backgroundColor: "#99BC85",
        yAxisID: "y1",
      },
    ],
  };

  const options: ChartOptions<"bar" | "line"> = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },

    plugins: {
      title: {
        display: false,
        text: "Daily Revenue and Room Count",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            const value = context.parsed.y;
            if (label === "Tổng") {
              return `${label}: ${value.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}`;
            }
            return `${label}: ${value}`;
          },
        },
      },
      legend: {
        position: "top" as const,
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: false,
          text: "Date",
        },
        grid: {
          display: false,
        },
      },
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        title: {
          display: false,
          text: "Revenue ($)",
        },
        grid: {
          display: false,
        },
        ticks: {
          maxTicksLimit: 5,
          callback: function (value) {
            return value.toLocaleString();
          },
        },
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        title: {
          display: false,
          text: "Room Count",
        },
        ticks: {
          maxTicksLimit: 3,
          callback: function (value) {
            return value.toLocaleString();
          },
        },
        grid: {
          drawOnChartArea: false,
          display: false,
        },
      },
    },
  };

  return (
    <div className="w-[1000px] h-full">
      <Chart type="bar" data={chartData} options={options} />
    </div>
  );
};

export default DailyBarChart;
