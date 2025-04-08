import { useEffect, useState } from 'react';
import HistoryPayment from '../HistoryPayment/HistoryPayment';
import DashboardCard from '../DashboardCard/DashboardCard';
import { DateRange } from 'react-day-picker';
import { CardItem, YearlyStat, ChartData } from '@/types/dashboard';
import { fetchCardData } from '@/services/dashboardService';
import YearlyRevenueChart from '../YearlyRevenueChart/YearlyRevenueChart';
import DailyRevenueChart from '../DailyRevenueChart/DailyRevenueChart';
import { TodayData } from '@/utils/TodayData';
import { getCardData } from '@/Pages/Dashboard/Dashboard.Data';
import PaymentMethodChart from '../PaymentMethodChart/PaymentMethodChart';
import { PaymentMethods } from '@/utils/paymentMethod';

interface MainContentProps {
  yearlyStat: YearlyStat[];
  revenueData: ChartData[];
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  year: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
}

interface PaymentData {
  cash: number;
  banking: number;
}

const MainContent = ({ yearlyStat, revenueData, date, setDate, year, setYear }: MainContentProps) => {
  const [cardData, setCardData] = useState<CardItem[]>([]);
  const [paymentData, setPaymentData] = useState<PaymentData>({
    cash: 0,
    banking: 0,
  });

  useEffect(() => {
    const loadCardData = async () => {
      const res = await fetchCardData();
      const dataToday = TodayData(res);
      setCardData(getCardData(dataToday));
      setPaymentData(PaymentMethods(res));
    };
    loadCardData();
  }, []);

  const handleDeleteCardItem = (title: string) => {
    const newCardData = cardData.filter((item) => item.title !== title);
    console.log(newCardData);
    setCardData(newCardData);
  };
  return (
    <main>
      <section>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {cardData.map((data, index) => (
            <DashboardCard key={index} CardData={data} handleDeleteCardItem={handleDeleteCardItem} />
          ))}
        </div>
        <div className="mt-10 flex justify-between gap-8 max-h-fit">
          <YearlyRevenueChart yearlyStat={yearlyStat} year={year} setYear={setYear} />
          <DailyRevenueChart revenueData={revenueData} date={date} setDate={setDate} />
          <PaymentMethodChart Data={paymentData} />
        </div>
      </section>

      <HistoryPayment />
    </main>
  );
};

export default MainContent;
