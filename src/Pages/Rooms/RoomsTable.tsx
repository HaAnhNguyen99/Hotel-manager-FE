import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatDateTime } from "@/utils/FormatDate";
import { useRoomsContext } from "@/context/RoomContext";
import { formatCurrency } from "@/utils/FormatCurrency";
import DeleteRoom from "./DeleteRoom";

const RoomsTable = () => {
  const { rooms, pagination, handlePaginationService, setSelectedRooms } =
    useRoomsContext();
  return (
    <div className="border rounded-2xl border-neutral-200 shadow-md p-2 mt-10 px-7">
      <Table className="mt-10">
        <TableHeader className="bg-[#f9fafb] h-10">
          <TableRow>
            <TableHead className="text-center">Id</TableHead>
            <TableHead className="text-center">Hình ảnh</TableHead>
            <TableHead className="text-center">Số phòng</TableHead>
            <TableHead className="text-center">Giá qua đêm</TableHead>
            <TableHead className="text-center">Giá giờ đầu</TableHead>
            <TableHead className="text-center">Giá giờ sau</TableHead>
            <TableHead className="text-center">Lần sửa gần nhất</TableHead>
            <TableHead className="text-center">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-center">
          {rooms?.map((room) => (
            <TableRow key={room.id} onClick={() => setSelectedRooms(room)}>
              <TableCell className="font-medium">{room.id}</TableCell>
              <TableCell className="flex justify-center">
                <img
                  src={room.img?.url}
                  alt={room.room_number}
                  className="w-16 h-16 rounded-full border border-neutral-400"
                />
              </TableCell>
              <TableCell className="font-medium">{room.room_number}</TableCell>
              <TableCell>{formatCurrency(room.price_per_night)}</TableCell>
              <TableCell>{formatCurrency(room.first_hourly_price)}</TableCell>
              <TableCell>{formatCurrency(room.after_hour_price)}</TableCell>
              <TableCell>{formatDateTime(room.updatedAt)}</TableCell>

              <TableCell className="m-auto h-full">
                <div className="flex gap-2 justify-center">
                  <DeleteRoom />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between w-full mt-4 mx-auto text-gray-400 text-sm mb-10">
        <div>
          <p className="flex">
            <span>Trang {pagination?.page} </span>
            <span>/</span>
            <span>{pagination.pageCount}</span>
          </p>
        </div>
        <div className="flex gap-1 max-h-5">
          <Button
            className="h-full bg-gray-300"
            disabled={pagination.page <= 1}
            onClick={() => {
              if (pagination.page > 1) {
                handlePaginationService(pagination.page - 1);
              }
            }}>
            <ChevronLeft />
          </Button>

          <Button
            className="h-full bg-gray-300"
            disabled={pagination.page >= pagination.pageCount}
            onClick={() => {
              if (pagination.page < pagination.pageCount) {
                handlePaginationService(pagination.page + 1);
              }
            }}>
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoomsTable;
