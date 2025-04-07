import React from 'react';
import DateFilter from './DateFilter';
import StatusFilter from './StatusFilter';
import Search from '../Search/Search';

interface HistoryHeaderProps {
  onSearch: (data: { search: string }) => void;
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const HistoryHeader: React.FC<HistoryHeaderProps> = ({ onSearch, date, setDate }) => {
  return (
    <div className="mb-5 flex justify-between">
      <h3 className="font-bold text-xl">Lịch sử</h3>
      <div className="flex gap-4">
        <Search onSearch={onSearch} />
        <DateFilter date={date} setDate={setDate} />
        <StatusFilter />
      </div>
    </div>
  );
};

export default HistoryHeader;
