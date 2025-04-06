import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface YearPickerProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
}

const YearPicker: React.FC<YearPickerProps> = ({
  selectedYear,
  onYearChange,
}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="p-2 px-4 -tracking-tighter flex gap-5 font-normal  text-[#1B1B1B] bg-grey-secondaryDark justify-center rounded-xl dark:bg-[#f5f5f5]">
          {selectedYear !== currentYear ? selectedYear : currentYear}
          <ChevronDown width={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-32 p-2">
        <div className="max-h-60 overflow-y-auto">
          {years.map((year) => (
            <div
              key={year}
              className={`p-2 text-center cursor-pointer rounded-md hover:bg-gray-200 ${
                year === selectedYear ? "bg-gray-300 font-bold" : ""
              }`}
              onClick={() => onYearChange(year)}>
              {year}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default YearPicker;
