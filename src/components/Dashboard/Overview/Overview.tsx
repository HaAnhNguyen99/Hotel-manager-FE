interface OverviewProps {
  title: string;
  value: number | string | undefined;
}

const Overview = ({ title, value }: OverviewProps) => {
  return (
    <div className="p-2 rounded-lg bg-slate-400 max-w-48">
      <h3 className="text-bold">{title}</h3>
      <p className="font-extrabold text-2xl">{value && value}</p>
    </div>
  );
};

export default Overview;
