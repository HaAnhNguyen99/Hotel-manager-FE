'use client';

import * as React from 'react';
import { CheckCircle2, XCircle, LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { UpdateServiceUsagePayload } from '@/types/service_usage';

type Status = {
  value: string;
  label: string;
  icon: LucideIcon;
};

interface ComboboxPopoverProps {
  currentStatus: string;
  handleUpdateServiceUsage: (serviceUsageId: string, payload: UpdateServiceUsagePayload) => void;
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  data: any[];
  serviceUsageId: any;
}

const statues: Status[] = [
  {
    value: 'paid',
    label: 'Đã thanh toán',
    icon: CheckCircle2,
  },
  {
    value: 'unpaid',
    label: 'Chưa thanh toán',
    icon: XCircle,
  },
];

export function ComboboxPopover({ currentStatus, handleUpdateServiceUsage, setData, data, serviceUsageId }: ComboboxPopoverProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState<Status>(statues.find((status) => status.label === currentStatus) || statues[0]);

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="w-[150px] justify-start">
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
                {statues.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={(value) => {
                      setSelectedStatus(statues.find((s) => s.value === value) || statues[0]);
                      setOpen(false);
                      setData((prevData) => ({
                        ...prevData,
                        service_status: value,
                      }));
                      //   handleUpdateServiceUsage(serviceUsageId, { ...data, service_status: value });
                    }}>
                    <status.icon className={cn('mr-2 h-4 w-4', status.value === selectedStatus?.value ? 'opacity-100' : 'opacity-40')} />
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
