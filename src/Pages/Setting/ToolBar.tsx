import React, { useState } from "react";
import {
  ArrowUpAZ,
  ArrowUpZA,
  Search,
  ArrowUp,
  ArrowDown,
  CircleX,
} from "lucide-react";
import { useServiceContext } from "@/context/ServiceContext";

const ToolBar = () => {
  const { handleSearch, setSortBy } = useServiceContext();
  const [priceOnClick, setPriceOnClick] = useState(false);
  const [nameOnClick, setNameOnClick] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchValue);
  };

  return (
    <div className="flex justify-between gap-2 flex-row-reverse text-neutral-500">
      <form
        onSubmit={handleSubmit}
        className="flex pl-6 pr-4 items-center flex-row-reverse w-1/3 gap-2 p-2 rounded-xl border shadow-sm toolbar-btn">
        <label
          htmlFor="search"
          className="flex items-center will-change-auto transition-all duration-300 ease-in-out">
          {searchValue ? (
            <button
              type="button"
              className="p-0"
              onClick={() => {
                handleSearch();
                setSearchValue("");
              }}>
              <CircleX className="text-[var(--border-primary)] w-5 h-5 " />
            </button>
          ) : (
            <Search className="text-[var(--border-primary)] w-5 h-5" />
          )}
        </label>
        <input
          id="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          placeholder="Tìm kiếm"
          className="w-full h-full bg-transparent outline-none"
        />
      </form>
      <div className="flex gap-2">
        {/* Price sort */}
        <button
          onClick={() => {
            setPriceOnClick(!priceOnClick);
            setSortBy(priceOnClick ? "priceAsc" : "priceDesc");
          }}
          className="flex gap-2 cursor-pointer hover:border-neutral-700 border border-neutral-200 items-center flex-shrink-0 shadow-md p-2 transition-all duration-300 ease-in-out rounded-xl toolbar-btn">
          <div className="flex gap-1 items-center px-4">
            Giá:
            {priceOnClick ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )}
          </div>
        </button>

        {/* Name sort */}
        <button
          className="cursor-pointer hover:border-neutral-700 border border-neutral-200 items-center flex-shrink-0 shadow-md p-2 transition-all duration-300 ease-in-out rounded-xl toolbar-btn"
          onClick={() => {
            setNameOnClick(() => !nameOnClick);
            setSortBy(nameOnClick ? "nameAsc" : "nameDesc");
          }}>
          <div className="flex gap-2 items-center px-4">
            Tên:
            {nameOnClick ? (
              <ArrowUpAZ className="h-5 w-5" />
            ) : (
              <ArrowUpZA className="h-5 w-5" />
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default ToolBar;
