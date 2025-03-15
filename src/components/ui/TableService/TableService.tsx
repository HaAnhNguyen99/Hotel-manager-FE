import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteServiceUsage, getServiceUsage } from "@/services/hotelService";
import { formatISODate } from "@/utils/FormatISOString";
import { useEffect, useState } from "react";
import { ComboboxPopover } from "@/components/rooms/TableService/ComboboxPopover/ComboboxPopover";
import { UpdateServiceUsagePayload } from "@/types/service_usage";
import { Spinner } from "@/components/common/Spinner/Spinner";
import { CircleX } from "lucide-react";
import CancelPopover from "@/components/rooms/CancelPopover/CancelPopover";
import { toast } from "sonner";

const formatCurrency = (amount: number): string =>
  amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

export const TableService = ({
  bookingId,
  isLoading,
}: {
  bookingId: string;
  isLoading: boolean;
}) => {
  const [data, setData] = useState<UpdateServiceUsagePayload[]>([]);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getServiceUsage(bookingId);
        setData(data);
      } catch (error) {
        console.error("Error fetching service usage:", error);
      }
    };
    fetchData();
  }, [bookingId, isLoading]);

  const handleDeleteServiceUsage = async (serviceUsageId: string) => {
    const previousData = [...data];
    try {
      setButtonLoading(true);
      setData(data.filter((item) => item.documentId !== serviceUsageId));
      await deleteServiceUsage(serviceUsageId);
      toast("Thành công", {
        description: "Đã xóa dịch vụ thành công.",
      });
    } catch (error: unknown) {
      setData(previousData);
      console.error("Error deleting service usage:", error);

      const errorMessage =
        error instanceof Error &&
        error.message?.includes("transaction is aborted")
          ? "Giao dịch thất bại, vui lòng thử lại sau."
          : "Không thể xóa dịch vụ.";

      toast.error("Lỗi!", {
        description: errorMessage,
      });
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>Danh sách dịch vụ đã đặt</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Tên dịch vụ</TableHead>
            <TableHead>Ngày đặt</TableHead>
            <TableHead>Số lượng</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Tổng tiền</TableHead>
            <TableHead className="w-fit whitespace-nowrap">
              Trạng thái
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                <div className="flex justify-center items-center w-full">
                  <Spinner />
                </div>
              </TableCell>
            </TableRow>
          ) : Array.isArray(data) && data.length > 0 ? (
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {item.service.name}
                </TableCell>
                <TableCell>{formatISODate(item.UsageDate)}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(Number(item.service.price))}
                </TableCell>
                <TableCell className="text-right">
                  {(
                    Number(item.service.price) * Number(item.quantity)
                  ).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </TableCell>
                <TableCell>
                  <ComboboxPopover
                    currentStatus={item.service_status}
                    serviceUsageId={item.documentId}
                  />
                </TableCell>
                <TableCell>
                  <CancelPopover
                    cancelFunction={() =>
                      handleDeleteServiceUsage(item.documentId)
                    }
                    title="Huỷ dịch vụ"
                    description="Huỷ dịch vụ?"
                    icon={<CircleX className="h-4 w-4" color="red" />}
                    buttonVariant="ghost"
                    className="p-0 hover:bg-transparent hover:scale-105"
                    loading={buttonLoading}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                Không có dữ liệu
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
