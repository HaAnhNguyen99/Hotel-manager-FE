export interface ChartData {
  date: string;
  total: number;
  roomCount: number;
}

export interface YearlyStat {
  month: number;
  total: number;
  roomCount: number;
}

export interface CompareDaily {
  yesterdayTotal: number;
  todayTotal: number;
  percentageChange: number;
}

export interface DateRange {
  from: Date;
  to?: Date;
}

export interface CardItem {
  title: string;
  value: number | string;
  icon: React.FC;
  iconColor?: string;
}
