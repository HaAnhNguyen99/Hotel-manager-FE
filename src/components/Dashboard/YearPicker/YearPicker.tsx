import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import YearIcon from "@/assets/svg/calendar.svg";

interface YearPickerProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
}

const YearPicker: React.FC<YearPickerProps> = ({
  selectedYear,
  onYearChange,
}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i); // 50 năm gần nhất

  return (
    <Popover>
      <PopoverTrigger asChild className="mb-10">
        <Button variant="outline" className="w-32 flex justify-around">
          {/* <YearIcon /> */}
          {selectedYear !== currentYear ? selectedYear : "Năm"}
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
