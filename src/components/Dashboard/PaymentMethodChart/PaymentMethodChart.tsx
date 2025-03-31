import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import "./PaymentMethodChart.css";
import { convertMoney } from "@/utils/convertMoney";
import { TooltipItem } from "chart.js";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, Filler);

interface PaymentMethodChartProps {
  Data: {
    cash: number;
    banking: number;
  };
}
function calculatePaymentRatio(cash: number, banking: number) {
  const total = cash + banking;
  return {
    cashRatio: total === 0 ? 0 : (cash / total) * 100,
    bankingRatio: total === 0 ? 0 : (banking / total) * 100,
  };
}
const PaymentMethodChart = ({ Data }: PaymentMethodChartProps) => {
  const total = (Data.cash + Data.banking).toLocaleString("USD");

  const Ratio = calculatePaymentRatio(Data.cash, Data.banking);

  // Chart configuration
  const data = {
    labels: ["Cash", "Banking"],
    datasets: [
      {
        label: "Financial Distribution",
        data: [Data.cash, Data.banking],
        backgroundColor: [
          "#ffe99a", // Color for Cash
          "#b490ac", // Color for Banking
        ],
        borderColor: ["rgba(96, 96, 96, 0.43)"],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"doughnut">) {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: $${value.toLocaleString()}`;
          },
        },
      },
    },
    cutout: "55%", // Controls the size of the doughnut hole
  };

  return (
    <div className="card-shadow w-1/4 flex-shrink-0 h-full">
      <div className="mb-10 card-header">Phương thức thanh toán</div>
      <div className="relative">
        <p className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 font-extrabold text-sm leading-6">
          ${total}
        </p>
        <Doughnut data={data} options={options} className="w-64" />
      </div>
      <div className="space-y-2 mt-2">
        <div className="flex justify-between items-center ">
          <div className="flex gap-2 h-full items-center">
            <div className="bar flex-shrink-0 w-1 bg-slate-400 min-h-12"></div>
            <div>
              <p className="text-sm text-gray-500">Tiền mặt</p>
              <p className="font-bold">{convertMoney(Data.cash)}</p>
            </div>
          </div>

          <div className="text-black px-2 p-2 tracking-tight font-bold bg-gray-200 rounded-lg text-xl">
            {Ratio.cashRatio}%
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2 h-full items-center">
            <div className="bar flex-shrink-0 w-1 bg-slate-400 min-h-12"></div>
            <div>
              <p className="text-sm text-gray-500">Chuyển khoản</p>
              <p className="font-bold">{convertMoney(Data.banking)}</p>
            </div>
          </div>

          <div className="text-black px-2 p-2 tracking-tight font-bold bg-gray-200 rounded-lg text-xl">
            {Ratio.bankingRatio}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodChart;
