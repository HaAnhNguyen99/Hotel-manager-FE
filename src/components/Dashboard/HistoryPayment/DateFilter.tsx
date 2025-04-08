import { LuFilter } from 'react-icons/lu';
import { ChevronDown as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar as CalenderPopup } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState } from 'react';

interface DateFilterProps {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const DateFilter: React.FC<DateFilterProps> = ({ date, setDate }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      <Popover open={isOpen}>
        <PopoverTrigger asChild>
          <Button
            onClick={() => setIsOpen((prev) => !prev)}
            variant={'outline'}
            className={cn(
              'bg-shadow-mode flex justify-around text-grey-secondaryLight items-center gap-6 p-1 px-4  border-border border bg-grey-secondaryDark dark:bg-grey-secondaryDark  hover:text-black dark:hover:text-white rounded-xl',
              !date && 'text-black'
            )}>
            <LuFilter className="text-grey-secondaryLight" />
            {date ? format(date, 'dd-MM-y') : <span className=" text-grey-secondaryLight">Ngày</span>}
            <CalendarIcon className=" h-4 w-4 text-grey-secondaryLight" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <CalenderPopup
            mode="single"
            selected={date}
            onSelect={(selectedDate) => {
              setDate(selectedDate);
              setIsOpen((prev) => !prev);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateFilter;
