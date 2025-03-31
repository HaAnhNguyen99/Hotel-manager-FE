import Search from "../Search/Search";
import DateFilter from "./DateFilter";
import StatusFilter from "./StatusFilter";

const HistoryHeader = () => {
  return (
    <div className="mb-5 flex justify-between">
      <h3 className=" font-bold text-xl">Lịch sử</h3>
      <div className="flex gap-4">
        <Search />
        <DateFilter />
        <StatusFilter />
      </div>
    </div>
  );
};

export default HistoryHeader;
