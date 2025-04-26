import React, { useState } from "react";
import { ArrowUpAZ, ArrowUpZA, ArrowUpDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useServiceContext } from "@/context/ServiceContext";

interface ToolBarProps {
  isLowToHigh: boolean;
  setIsNameDesc: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLowToHigh: React.Dispatch<React.SetStateAction<boolean>>;
  isNameDesc: boolean;
  handleSearch: () => void;
}
const ToolBar = () => {
  const { handleSearch, setSortBy } = useServiceContext();
  const [priceOnClick, setPriceOnClick] = useState(true);
  const [nameOnClick, setNameOnClick] = useState(true);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchInputRef.current?.value);
  };

  return (
    <div className="flex justify-between gap-2 flex-row-reverse text-neutral-500">
      <form
        onSubmit={handleSubmit}
        className="flex pl-5 pr-2 items-center flex-row-reverse w-1/2 gap-2 border p-2 border-neutral-400 shadow-sm rounded-lg">
        <label htmlFor="search">
          <Search />
        </label>
        <input
          id="search"
          ref={searchInputRef}
          type="text"
          placeholder="Tìm kiếm"
          className="w-full h-full outline-none"
        />
      </form>
      <div className="flex gap-2">
        {/* Price sort */}
        <div
          className="flex gap-2 cursor-pointer hover:border-neutral-700 border border-neutral-200 items-center flex-shrink-0 shadow-sm rounded-md p-2 transition-all duration-300 ease-in-out"
          onClick={() => setPriceOnClick(!priceOnClick)}>
          <ArrowUpDown />
          {priceOnClick ? (
            <button onClick={() => setSortBy("priceDesc")}>
              Giá: Cao đến thấp
            </button>
          ) : (
            <button onClick={() => setSortBy("priceAsc")}>
              Giá: Thấp đến cao
            </button>
          )}
        </div>

        {/* Name sort */}
        <div
          className="cursor-pointer hover:border-neutral-700 border border-neutral-200 items-center flex-shrink-0 shadow-sm rounded-md p-2 transition-all duration-300 ease-in-out"
          onClick={() => setNameOnClick(!nameOnClick)}>
          <button
            className="flex gap-2"
            onClick={() => setSortBy(nameOnClick ? "nameAsc" : "nameDesc")}>
            {nameOnClick ? <ArrowUpAZ /> : <ArrowUpZA />}
            Tên: {nameOnClick ? "A-Z" : "Z-A"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToolBar;
