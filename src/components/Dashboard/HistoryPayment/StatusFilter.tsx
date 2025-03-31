import { useState } from "react";
import { LuFilter } from "react-icons/lu";
import { ChevronDown as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BookingStatus } from "@/types/booking";

const StatusFilter = () => {
  const [status, setStatus] = useState<BookingStatus>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "flex justify-around items-center gap-6 p-1 px-4  border-border border bg-grey-secondaryDark  rounded-xl",
            !status && "text-black"
          )}>
          <LuFilter className=" text-grey-secondaryLight" />
          {status ? (
            status
          ) : (
            <span className="text-grey-secondaryLight">Trạng thái</span>
          )}
          <CalendarIcon className=" h-4 w-4 text-grey-secondaryLight" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="flex flex-col gap-2 p-2 border-border border bg-grey-secondaryDark">
          <Button
            onClick={() => setStatus(BookingStatus.Completed)}
            variant="ghost"
            className="border border-gray-500 rounded-lg hover:bg-black hover:text-white transition-all">
            Hoàn tất
          </Button>
          <Button
            onClick={() => setStatus(BookingStatus.Pending)}
            variant="ghost"
            className="border border-gray-500 rounded-lg hover:bg-black hover:text-white transition-all ">
            Chờ thanh toán
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default StatusFilter;
