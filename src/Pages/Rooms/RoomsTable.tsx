import {
  Image,
  Blinds,
  BookmarkCheck,
  BookmarkPlus,
  History,
  Zap,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CircleCheck, MoonStar } from "lucide-react";
import { formatDateTime } from "@/utils/FormatDate";
import { useRoomsContext } from "@/context/RoomContext";
import { formatCurrency } from "@/utils/FormatCurrency";
import DeleteRoom from "./DeleteRoom";
import { RoomStatus } from "@/types/room";

const RoomsTable = () => {
  const { rooms, pagination, handlePaginationService, setSelectedRooms } =
    useRoomsContext();
  return (
    <div className="border rounded-2xl border-neutral-200 shadow-md p-2 mt-10 px-7">
      <Table className="mt-10">
        <TableHeader className="bg-[#f9fafb] dark:bg-slate-600 h-10">
          <TableRow>
            <TableHead className="text-center">Id</TableHead>
            <TableHead className="text-center">
              <div className="flex-center">
                <Image className="w-5 h-5" />
                Hình ảnh
              </div>
            </TableHead>
            <TableHead className="text-center">
              <div className="flex-center">
                <Blinds className="w-5 h-5" />
                Số phòng
              </div>
            </TableHead>
            <TableHead className="text-center">
              <div className="flex-center">
                <CircleCheck className="w-5 h-5" />
                Trạng thái
              </div>
            </TableHead>
            <TableHead className="text-center ">
              <div className="flex-center">
                <MoonStar className="text-border w-5 h5" />
                Giá qua đêm
              </div>
            </TableHead>
            <TableHead className="text-center ">
              <div className="flex-center">
                <BookmarkCheck className="text-border w-5 h5" />
                Giá giờ đầu
              </div>
            </TableHead>
            <TableHead className="text-center ">
              <div className="flex-center">
                <BookmarkPlus className="text-border w-5 h5" />
                Giá giờ sau
              </div>
            </TableHead>
            <TableHead className="text-center ">
              <div className="flex-center">
                <History className="text-border w-5 h5" />
                Lần sửa gần nhất
              </div>
            </TableHead>
            <TableHead className="text-center ">
              <div className="flex-center">
                <Zap className="text-border w-5 h5" />
                Hành động
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-center ">
          {rooms?.map((room) => (
            <TableRow
              key={room.id}
              onClick={() => setSelectedRooms(room)}
              className="odd:bg-white even:bg-landing-primaryLight dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium">{room.id}</TableCell>
              <TableCell className="flex justify-center">
                <img
                  src={room.img?.url}
                  alt={room.room_number}
                  className="w-16 h-16 rounded-full border border-neutral-400"
                />
              </TableCell>
              <TableCell className="font-medium">{room.room_number}</TableCell>
              <TableCell className="font-medium">
                {room.room_status === RoomStatus.Available ? (
                  <div className="rounded-full w-fit px-3 mx-auto bg-green-400 border">
                    Sẵn sàng
                  </div>
                ) : (
                  <div className="rounded-full w-fit px-3 mx-auto bg-red-400 border">
                    Có người
                  </div>
                )}
              </TableCell>
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
