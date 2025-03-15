"use client";

import * as React from "react";
import { CheckCircle2, XCircle, LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { updateServicePayment } from "@/services/hotelService";
import { toast } from "sonner";

type Status = {
  value: string;
  label: string;
  icon: LucideIcon;
};

interface ComboboxPopoverProps {
  currentStatus: string;
  serviceUsageId: string;
}

const statusArr: Status[] = [
  {
    value: "paid",
    label: "Đã thanh toán",
    icon: CheckCircle2,
  },
  {
    value: "unpaid",
    label: "Chưa thanh toán",
    icon: XCircle,
  },
];

export function ComboboxPopover({
  currentStatus,
  serviceUsageId,
}: ComboboxPopoverProps) {
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Status>(
    statusArr.find((status) => status.label === currentStatus) || statusArr[1]
  );

  const handleSelectStatus = async (value: Status) => {
    const previousStatus = selectedStatus;
    try {
      setSelectedStatus(
        statusArr.find((s) => s.label === value.label) || statusArr[0]
      );
      await updateServicePayment(serviceUsageId, value.label);
    } catch (error: unknown) {
      console.log(error);
      toast.error("Lỗi khi cập nhật trạng thái");
      setSelectedStatus(previousStatus);
    }
  };

  useEffect(() => {
    console.log(selectedStatus);
  }, [selectedStatus]);

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-[150px] justify-start text-zinc-700">
            {selectedStatus ? (
              <>
                <selectedStatus.icon className=" h-4 w-4 shrink-0" />
                {selectedStatus.label}
              </>
            ) : (
              <>+ Set status</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Đổi trạng thái..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {statusArr.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={() => handleSelectStatus(status)}>
                    <status.icon
                      className={cn(
                        "mr-2 h-4 w-4",
                        status.value === selectedStatus?.value
                          ? "opacity-100"
                          : "opacity-40"
                      )}
                    />
                    <span>{status.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
