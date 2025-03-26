import { Button } from "@/components/ui/button";
import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  Command,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { RoomType } from "@/types/booking";
import { ChevronsUpDown, Hourglass, Moon } from "lucide-react";
import { useState } from "react";

interface PopoverProps {
  selectedRoomType: RoomType;
  setSelectedRoomType: React.Dispatch<React.SetStateAction<RoomType>>;
}

const RoomTypePopover: React.FC<PopoverProps> = ({
  selectedRoomType,
  setSelectedRoomType,
}) => {
  const [open, setOpen] = useState(false);

  // Room type data
  const RoomTypeData = [
    {
      label: "Giờ",
      value: RoomType.Hour,
      icon: <Hourglass className="mr-2" />,
    },
    {
      label: "Qua Đêm",
      value: RoomType.Overnight,
      icon: <Moon className="mr-2" />,
    },
  ];

  const selectedRoomTypeLabel = RoomTypeData.find(
    (method) => method.value === selectedRoomType
  )?.label;

  const selectedRoomTypeIcon = RoomTypeData.find(
    (method) => method.value === selectedRoomType
  )?.icon;
  console.log(selectedRoomType);

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen} modal>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between">
            <div className="flex items-center text-black">
              {selectedRoomTypeIcon}
              {selectedRoomTypeLabel}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-44 p-2">
          <Command>
            <CommandList>
              <CommandEmpty>Không tìm thấy loại phòng</CommandEmpty>
              <CommandGroup>
                {RoomTypeData.map((method, index) => (
                  <CommandItem
                    key={index}
                    value={method.value}
                    onSelect={(currentValue) => {
                      setSelectedRoomType(currentValue as RoomType);
                      setOpen(false);
                    }}
                    className="flex items-center cursor-pointer ">
                    {method.icon}
                    <span>{method.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default RoomTypePopover;
