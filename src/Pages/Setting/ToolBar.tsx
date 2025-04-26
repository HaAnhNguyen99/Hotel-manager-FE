import React, { useState } from "react";
import { ArrowUpAZ, ArrowUpZA, Search, ArrowUp, ArrowDown } from "lucide-react";
import { useServiceContext } from "@/context/ServiceContext";

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
        className="flex pl-6 pr-4 items-center flex-row-reverse w-1/3 gap-2 border p-2 border-neutral-400 rounded-2xl shadow-md toolbar-btn">
        <label htmlFor="search">
          <Search className="text-[var(--border-primary)] w-5 h-5" />
        </label>
        <input
          id="search"
          ref={searchInputRef}
          type="text"
          placeholder="Tìm kiếm"
          className="w-full h-full bg-transparent outline-none"
        />
      </form>
      <div className="flex gap-2">
        {/* Price sort */}
        <div
          className="flex gap-2 cursor-pointer hover:border-neutral-700 border border-neutral-200 items-center flex-shrink-0 shadow-md p-2 transition-all duration-300 ease-in-out rounded-xl toolbar-btn"
          onClick={() => setPriceOnClick(() => !priceOnClick)}>
          {priceOnClick ? (
            <button
              onClick={() => setSortBy("priceDesc")}
              className="flex gap-1 items-center px-4">
              Giá: <ArrowUp className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => setSortBy("priceAsc")}
              className="flex gap-1 items-center px-4">
              Giá: <ArrowDown className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Name sort */}
        <div
          className="cursor-pointer hover:border-neutral-700 border border-neutral-200 items-center flex-shrink-0 shadow-md p-2 transition-all duration-300 ease-in-out rounded-xl toolbar-btn"
          onClick={() => setNameOnClick(() => !nameOnClick)}>
          <button
            className="flex gap-2 items-center px-4"
            onClick={() => setSortBy(nameOnClick ? "nameAsc" : "nameDesc")}>
            Tên:
            {nameOnClick ? (
              <ArrowUpAZ className="h-5 w-5" />
            ) : (
              <ArrowUpZA className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToolBar;
