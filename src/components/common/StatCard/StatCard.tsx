type StatCardProps = {
  title: string;
  value: number;
  icon?: React.ReactNode;
  onClick?: () => void;
  isSelected?: boolean;
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  onClick,
  isSelected = false,
}) => (
  <div
    onClick={onClick}
    className={`py-2 px-4 rounded-lg cursor-pointer shadow-md transition border border-border hover:opacity-80 w-full 
      ${isSelected ? " border bg-yellow-secondary" : "bg-card"}`}>
    <div className="text-neutral-600 flex items-center justify-between gap-2">
      <div className="text-[#ff7c7c]">{icon}</div>
      <p className="font-semibold">{title}</p>
      <p className="text-grey-foreground">({value})</p>
    </div>
  </div>
);

export default StatCard;
