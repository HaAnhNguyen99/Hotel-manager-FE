import {
  Image,
  Blinds,
  BookmarkCheck,
  BookmarkPlus,
  History,
  Zap,
  LucideIcon,
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

interface HeaderCellProps {
  label: string;
  icon: LucideIcon | null;
  className: string;
  iconClass?: string;
}

const HeaderCell: React.FC<HeaderCellProps> = ({
  label,
  icon: Icon,
  className,
  iconClass,
}) => (
  <TableHead className={className}>
    <div className="flex items-center justify-center gap-1">
      {Icon && <Icon className={`w-5 h-5 ${iconClass || ""}`} />}
      {label}
    </div>
  </TableHead>
);

interface Column {
  label: string;
  icon: LucideIcon | null;
  className: string;
  iconClass?: string;
}

const className =
  "text-center hover:bg-neutral-500 hover:text-white dark:hover:bg-black  py-5";

const columns: Column[] = [
  { label: "Id", icon: null, className, iconClass: "text-neutral-700" },
  { label: "Hình ảnh", icon: Image, className, iconClass: "text-neutral-400" },
  { label: "Số phòng", icon: Blinds, className, iconClass: "text-neutral-400" },
  {
    label: "Trạng thái",
    icon: CircleCheck,
    className,
    iconClass: "text-neutral-400",
  },
  {
    label: "Giá qua đêm",
    icon: MoonStar,
    className,
    iconClass: "text-neutral-400",
  },
  {
    label: "Giá giờ đầu",
    icon: BookmarkCheck,
    className,
    iconClass: "text-neutral-400",
  },
  {
    label: "Giá giờ sau",
    icon: BookmarkPlus,
    className,
    iconClass: "text-neutral-400",
  },
  {
    label: "Lần sửa gần nhất",
    icon: History,
    className,
    iconClass: "text-neutral-400",
  },
  {
    label: "Hành động",
    icon: Zap,
    className,
    iconClass: "text-neutral-400",
  },
];

const RoomsTable = () => {
  const { rooms, pagination, handlePaginationService, setSelectedRooms } =
    useRoomsContext();

  return (
    <div className="border rounded-2xl border-neutral-200 shadow-md p-2 mt-10 px-7">
      <Table className="mt-10">
        <TableHeader className="bg-[#f9fafb] dark:bg-slate-600">
          <TableRow>
            {columns.map((col, index) => (
              <HeaderCell
                key={index}
                label={col.label}
                icon={col.icon}
                className={col.className}
                iconClass={col.iconClass}
              />
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="text-center ">
          {rooms?.map((room) => (
            <TableRow
              key={room.id}
              onClick={() => setSelectedRooms(room)}
              className="odd:bg-white even:bg-landing-bgLight dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
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
                  <div className="rounded-full w-fit px-3 mx-auto text-green-800 bg-green-400 py-1 border">
                    Sẵn sàng
                  </div>
                ) : (
                  <div className="rounded-full w-fit px-3 mx-auto text-red-800 bg-red-300 py-1 border">
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
