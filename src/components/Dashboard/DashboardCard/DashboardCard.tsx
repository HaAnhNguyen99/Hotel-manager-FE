import PopupCard from "./PopupCard";

export type DashboardCardProps = {
  title: string;
  value?: number | string;
  icon?: React.ElementType;
  day?: string;
  profit?: number;
  color?: string;
  foreground?: string;
  textColor?: string;
  iconColor?: string;
};

const DashboardCard = ({
  CardData,
  handleDeleteCardItem,
}: {
  CardData: DashboardCardProps;
  handleDeleteCardItem: (title: string) => void;
}) => {
  const {
    title,
    value,
    icon: Icon,
    color = "bg-white",
    foreground = "bg-yellow-secondary",
    textColor,
    iconColor = "pink",
  } = CardData;

  return (
    <div
      className={`stat-card ${color} ${textColor} flex-1 flex-shrink-0 py-6 px-8 flex gap-2 justify-between card-shadow-mode`}>
      <div className="flex gap-4 items-center py-6">
        <div className="self-center">
          <div className={`${foreground} rounded-full p-5`}>
            {Icon && <Icon size={32} color={iconColor} />}
          </div>
        </div>
        <h3 className=" text-left text-grey font-normal text-[14px] whitespace-nowrap">
          {title}
          <p className="font-bold text-4xl leading-snug text-black dark:text-grey-secondaryDark">
            {value}
          </p>
        </h3>
      </div>
      <PopupCard handleDeleteCardItem={handleDeleteCardItem} title={title} />
    </div>
  );
};

export default DashboardCard;
