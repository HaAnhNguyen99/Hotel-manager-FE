// components/PaymentTable.tsx
import { InlineLoading } from "@/components/common/InlineLoading/InlineLoading";
import CancelPopover from "@/components/rooms/CancelPopover/CancelPopover";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteReservations } from "@/services/hotelService";
import { BookingStatus } from "@/types/booking";
import { PaymentMethod } from "@/types/payment";
import { RevenueData } from "@/types/reservation";
import { ChevronLeft, ChevronRight, CircleX } from "lucide-react";
import { toast } from "sonner";

// Hàm định dạng ngày
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString("vi-VN", {
    dateStyle: "short",
    timeStyle: "short",
  });
};

// Hàm định dạng số tiền
const formatAmount = (amount: string) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(parseInt(amount));
};

interface paginationOptions {
  start: number;
  limit: number;
  total: number;
}

export interface PaymentTableProp {
  paymentData: RevenueData[] | undefined;
  setPaymentData: React.Dispatch<
    React.SetStateAction<RevenueData[] | undefined>
  >;
  pagination: paginationOptions;
  setPagination: React.Dispatch<React.SetStateAction<paginationOptions>>;
  handlePagination: (start: number) => Promise<void>;
  loading: boolean;
}

const PaymentTable: React.FC<PaymentTableProp> = ({
  paymentData,
  setPaymentData,
  pagination,
  setPagination,
  handlePagination,
  loading,
}) => {
  // Handle cancel button click
  const handleCancel = async (id: string) => {
    const prevData = paymentData ? [...paymentData] : undefined;
    try {
      // Call API to cancel booking
      await deleteReservations(id);
      // Update paymentData
      const updatedData = paymentData?.filter(
        (payment) => payment.documentId !== id
      );
      setPaymentData(updatedData);
      toast.success("Xoá thành công");
    } catch {
      // Handle error
      toast.error("Có lỗi xảy ra");
      setPaymentData(prevData);
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Ngày</TableHead>
            <TableHead className="w-[200px] text-center">Phương thức</TableHead>
            <TableHead className="text-center">Số tiền</TableHead>
            <TableHead className="text-center">Tên</TableHead>
            <TableHead className="text-center">CCCD</TableHead>
            <TableHead className="text-center">Giảm giá</TableHead>
            <TableHead className="text-center">Loại phòng</TableHead>
            <TableHead className="text-center">Ghi chú</TableHead>
            <TableHead className="text-center">Trạng thái</TableHead>
            <TableHead className="text-center">...</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={10} className="text-center">
                <InlineLoading />
              </TableCell>
            </TableRow>
          ) : paymentData ? (
            paymentData.map((payment: RevenueData, index: number) => (
              <TableRow
                key={payment.id}
                className={`text-center dark:text-white hover:opacity-80 ${
                  index % 2 === 0
                    ? "bg-[#fffaf7] dark:bg-transparent"
                    : "bg-[#fff6eb] dark:bg-[#9ca3af]"
                }`}>
                <TableCell className="font-medium text-left">
                  {payment.id}
                </TableCell>
                <TableCell className="text-left">
                  {formatDate(payment.date)}
                </TableCell>
                <TableCell className="text-center">
                  {payment.payment_method === PaymentMethod.Cash
                    ? "Tiền mặt"
                    : "Chuyển khoản"}
                </TableCell>
                <TableCell>{formatAmount(payment.amount)}</TableCell>
                <TableCell>{payment.booking.guest_name}</TableCell>
                <TableCell>{payment.booking.cccd || "Không có"}</TableCell>
                <TableCell>{payment.booking.reduction}</TableCell>
                <TableCell>{payment.booking.type}</TableCell>
                <TableCell>{payment.note || "Không có"}</TableCell>
                <TableCell className="flex justify-center items-center mt-1 h-full">
                  <p className="boder border-dark-green bg-white  w-fit py-1 px-2 rounded-xl text-sm text-green-dark max-h-[80%] border-green-600 border">
                    {payment.booking.booking_status === BookingStatus.Completed
                      ? "Hoàn tất"
                      : "Chờ thanh toán"}
                  </p>
                </TableCell>
                <TableCell>
                  <CancelPopover
                    cancelFunction={() => handleCancel(payment.documentId)}
                    title="Huỷ phòng"
                    description="Bạn có chắc chắn muốn huỷ phòng này?"
                    icon={<CircleX className="h-4 w-4" color="red" />}
                    buttonVariant="ghost"
                    className="p-0 hover:bg-transparent hover:scale-105"
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className="bg-[#fffaf7] w-full text-center">
              <TableCell>"Không có dữ liệu"</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-between w-full mt-4 mx-auto text-gray-400 text-sm">
        <div>
          <p className="flex">
            <span>Trang {pagination.start / pagination.limit + 1} </span>
            <span>/</span>
            <span>{Math.ceil(pagination.total / pagination.limit)}</span>
          </p>
        </div>
        <div className="flex gap-1 max-h-5">
          <Button
            className="h-full bg-gray-300"
            disabled={pagination.start === 0}
            onClick={() => {
              setPagination((prev) => ({
                ...prev,
                start: prev.start - prev.limit,
              }));
              handlePagination(pagination.start - pagination.limit);
            }}>
            <ChevronLeft />
          </Button>

          <Button
            className="h-full bg-gray-300"
            disabled={pagination.start + pagination.limit >= pagination.total}
            onClick={() => {
              setPagination((prev) => ({
                ...prev,
                start: prev.start + prev.limit,
              }));
              handlePagination(pagination.start + pagination.limit);
            }}>
            <ChevronRight />
          </Button>
        </div>
      </div>
    </>
  );
};

export default PaymentTable;
