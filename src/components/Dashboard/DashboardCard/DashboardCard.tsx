import { TrendingUp, TrendingDown } from "lucide-react";

type DashboardCardProps = {
  title: string;
  value: string;
  icon: React.ElementType;
  day: string;
  profit: number;
  color: string;
  foreground: string;
};

const DashboardCard = ({ CardData }: { CardData: DashboardCardProps }) => {
  const { title, value, icon: Icon, day, profit, color, foreground } = CardData;
  const isProfitPositive = profit > 0;
  const ProfitIcon = isProfitPositive ? TrendingUp : TrendingDown;
  const profitColor = isProfitPositive ? "text-green-600" : "text-red-500";

  return (
    <div className={`stat-card ${color}`}>
      <div className="flex gap-2 mb-5">
        <div className={`${foreground} p-1 rounded-md`}>
          {Icon && <Icon size={24} color="white" />}
        </div>
        <h3>{title}</h3>
      </div>

      <div className="flex gap-2 items-end justify-center">
        <p className="font-bold text-4xl leading-snug">{value}</p>
        <div>
          <div className={`flex items-center gap-1 ${profitColor}`}>
            <ProfitIcon color={isProfitPositive ? "green" : "red"} size={14} />
            <p className="text-[0.7rem] font-semibold">{profit}%</p>
          </div>
          <p className="mb-1 text-[0.8rem]">{day}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
