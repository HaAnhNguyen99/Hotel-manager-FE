import { useCallback, useEffect, useState } from "react";
import PaymentTable from "../PaymentTable/PaymentTable";
import {
  getReservationsFromDate,
  getReservationsPagination,
  getSearchData,
} from "@/services/hotelService";
import { RevenueData } from "@/types/reservation";
import HistoryHeader from "./HistoryHeader";
import { getTodayISODate } from "@/utils/getTodayISODate";

const HistoryPayment: React.FC = () => {
  const [paymentData, setPaymentData] = useState<RevenueData[] | undefined>();
  const [searchData, setSearchData] = useState<RevenueData[] | undefined>(); // State cho kết quả tìm kiếm
  const [prevPaymentData, setPrevPaymentData] = useState<
    RevenueData[] | undefined
  >(); // State cho kết quả tìm kiếm

  const [date, setDate] = useState<Date>();
  const [pagination, setPagination] = useState({
    start: 0,
    limit: 6,
    total: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [tempPagination, setTempPagination] = useState({
    start: 0,
    limit: 6,
    total: 0,
  });
  const resetPagination = {
    start: 0,
    limit: 6,
    total: 0,
  };

  // Hàm xử lý phân trang
  const handlePagination = useCallback(
    async (start: number) => {
      setLoading(true);
      try {
        const res = await getReservationsPagination(start, pagination.limit);
        setPaymentData(res.data.data);
        setPrevPaymentData(res.data.data);
        setPagination(res.data.meta.pagination);
        setTempPagination(res.data.meta.pagination);
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      } finally {
        setLoading(false);
      }
    },
    [pagination.limit]
  );

  // Hàm xử lý tìm kiếm
  const onSubmit = async (data: { search: string }) => {
    setLoading(true);
    if (data.search.trim() === "") {
      setSearchData(paymentData);
      setPagination(tempPagination);
    }
    try {
      const response = await getSearchData(data.search);
      setSearchData(response);
      setPagination(resetPagination);

      if (date) {
        const { startDate, endDate } = getTodayISODate(date);
        const filtered = searchData?.filter((item) => {
          return item.date >= startDate && item.date <= endDate;
        });
        console.log(filtered);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Gọi API phân trang khi mount
  useEffect(() => {
    handlePagination(0);
  }, [handlePagination]);

  useEffect(() => {
    const getDatePayment = async () => {
      if (!date) {
        setPaymentData(prevPaymentData);
        setPagination(tempPagination);
      }
      if (date) {
        const { startDate, endDate } = getTodayISODate(date);
        const paymentDataRes = await getReservationsFromDate(
          startDate,
          endDate
        );

        setPaymentData(paymentDataRes);
        setPagination(resetPagination);
      }
    };

    getDatePayment();
  }, [date]);
  return (
    <section>
      <div className="card-shadow mt-10 bg-shadow-mode">
        <HistoryHeader onSearch={onSubmit} date={date} setDate={setDate} />
        <PaymentTable
          paymentData={searchData || paymentData}
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
