import { useCallback, useEffect, useState } from "react";
import PaymentTable from "../PaymentTable/PaymentTable";
import { getReservationsPagination } from "@/services/hotelService";
import { RevenueData } from "@/types/reservation";
import HistoryHeader from "./HistoryHeader";

const HistoryPayment: React.FC = () => {
  const [paymentData, setPaymentData] = useState<RevenueData[] | undefined>();
  const [pagination, setPagination] = useState({
    start: 0,
    limit: 4,
    total: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handlePagination = useCallback(
    async (start: number) => {
      setLoading(true);
      try {
        const res = await getReservationsPagination(start, pagination.limit);
        setPaymentData(res.data.data);
        setPagination(res.data.meta.pagination);
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      } finally {
        setLoading(false);
      }
    },
    [pagination.start]
  );

  useEffect(() => {
    handlePagination(0);
  }, []);

  return (
    <section>
      <div className="card-shadow mt-10">
        <HistoryHeader />
        <PaymentTable
          paymentData={paymentData}
          setPaymentData={setPaymentData}
          pagination={pagination}
          setPagination={setPagination}
          handlePagination={handlePagination}
          loading={loading}
        />
      </div>
    </section>
  );
};

export default HistoryPayment;
