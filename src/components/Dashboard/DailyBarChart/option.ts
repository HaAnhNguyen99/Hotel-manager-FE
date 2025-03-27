import { formatDate } from "@/utils/formatChartDate";
import { ChartOptions, ChartData } from "chart.js";
import { DailyBarChartProps } from "./DailyBarChart";
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

export function chartOption(data: DailyBarChartProps): {
  chartData: ChartData<"bar" | "line">;
  options: ChartOptions<"bar" | "line">;
} {
  if (!data?.data?.length) {
    return {
      chartData: { labels: [], datasets: [] },
      options: {},
    };
  }

  const chartData: ChartData<"bar" | "line"> = {
    labels: data.data.map((item) => formatDate(item.date)),
    datasets: [
      {
        type: "line" as const,
        label: "Tổng",
        data: data.data.map((item) => item.total),
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        yAxisID: "y",
        tension: 0.3,
        fill: true,
      },
      {
        type: "bar" as const,
        label: "Số phòng",
        data: data.data.map((item) => item.roomCount),
        borderColor: "#2196F3",
        backgroundColor: "#99BC85",
        yAxisID: "y1",
      },
    ],
  };

  const options: ChartOptions<"bar" | "line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      title: {
        display: false,
        text: "Daily Revenue and Room Count",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
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
        position: "top",
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
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: false,
          text: "Revenue (VND)",
        },
        grid: {
          display: true,
          lineWidth: 2,
        },
        border: {
          dash: [2, 4],
        },
        ticks: {
          maxTicksLimit: 5,
          callback: (value) => value.toLocaleString("vi-VN"),
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: false,
          text: "Room Count",
        },
        ticks: {
          maxTicksLimit: 3,
          callback: (value) => value.toLocaleString("vi-VN"),
        },
        grid: {
          drawOnChartArea: false,
          display: false,
        },
      },
    },
  };

  return { chartData, options };
}
