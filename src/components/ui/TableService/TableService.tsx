import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getServiceUsage, updateServiceUsage } from '@/services/hotelService';
import { formatISODate } from '@/utils/FormatISOString';
import { useEffect, useState } from 'react';
import { ComboboxPopover } from '@/components/rooms/TableService/ComboboxPopover/ComboboxPopover';
import { UpdateServiceUsagePayload } from '@/types/service_usage';

export const TableService = ({ bookingId, isLoading }: { bookingId: string; isLoading: boolean }) => {
  const [data, setData] = useState<UpdateServiceUsagePayload[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getServiceUsage(bookingId);
      setData(data);
    };
    fetchData();
  }, [bookingId, isLoading]);

  const handleUpdateServiceUsage = async (serviceUsageId: string, payload: UpdateServiceUsagePayload) => {
    const data = await updateServiceUsage(serviceUsageId, payload);
    setData(data);
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
            <TableHead className="w-fit whitespace-nowrap">Trạng thái</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.service.name}</TableCell>
                <TableCell>{formatISODate(item.UsageDate)}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell className="text-right">
                  {Number(item.service.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </TableCell>
                <TableCell className="text-right">
                  {(Number(item.service.price) * Number(item.quantity)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </TableCell>
                <TableCell>
                  <ComboboxPopover
                    currentStatus={item.service_status}
                    handleUpdateServiceUsage={handleUpdateServiceUsage}
                    setData={setData}
                    data={data}
                    serviceUsageId={item.documentId}
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
