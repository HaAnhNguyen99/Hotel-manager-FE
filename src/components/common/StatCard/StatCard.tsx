type StatCardProps = {
  title: string;
  value: number;
  icon?: string | React.ReactNode;
  color?: string;
};

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color = 'primary' }) => (
  <div className={`p-4 rounded-lg bg-card shadow-sm`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className={`text-2xl font-bold text-${color}`}>{value}</p>
      </div>
      {icon && <div className={`text-${color} text-xl`}>{icon}</div>}
    </div>
  </div>
);

export default StatCard;
