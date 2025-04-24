import { ArrowUpAZ, ArrowUpZA, ArrowUpDown, Search } from "lucide-react";
import AddService from "./AddService";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Setting = () => {
  const [isLowToHigh, setIsLowToHigh] = useState(true);
  const [isNameDesc, setIsNameDesc] = useState(true);

  const handleSearch = () => {
    console.log();
  };

  return (
    <section className="p-5 font-pops">
      {/* Header */}
      <header className="flex mb-10 justify-between">
        <h3 className="text-3xl font-bold font-playfair">Quản lý dịch vụ</h3>
        <AddService />
      </header>

      {/* search */}
      <div className="flex justify-between gap-2 flex-row-reverse text-neutral-500">
        <form
          onSubmit={handleSearch}
          className="flex pl-5 pr-2 items-center flex-row-reverse w-1/2 gap-2 border p-2 border-neutral-400 shadow-sm rounded-lg">
          <label htmlFor="search">
            <Search />
          </label>
          <input
            id="search"
            type="text"
            placeholder="Tìm kiếm"
            className="w-full h-full outline-none"
          />
        </form>

        {/* Action button */}
        <div className="flex gap-2">
          {/* Price sort */}
          <div className="flex gap-2 cursor-pointer hover:border-neutral-700 border border-neutral-200 items-center flex-shrink-0 shadow-sm rounded-md p-2 transition-all duration-300 ease-in-out">
            <ArrowUpDown />
            {isLowToHigh ? (
              <button onClick={() => setIsLowToHigh(false)}>
                Giá: Cao đến thấp
              </button>
            ) : (
              <button onClick={() => setIsLowToHigh(true)}>
                Giá: Thấp đến cao
              </button>
            )}
          </div>

          {/* Name sort */}
          <div className="cursor-pointer hover:border-neutral-700 border border-neutral-200 items-center flex-shrink-0 shadow-sm rounded-md p-2 transition-all duration-300 ease-in-out">
            <button
              className="flex gap-2"
              onClick={() => setIsNameDesc(!isNameDesc)}>
              {isNameDesc ? <ArrowUpAZ /> : <ArrowUpZA />}
              Tên: {isNameDesc ? "A-Z" : "Z-A"}
            </button>
          </div>

          {/* Reset */}
          <Button
            variant="destructive"
            className="flex-shrink-0 text-base h-full"
            onClick={() => {
              setIsLowToHigh(true);
              setIsNameDesc(true);
            }}>
            Reset
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Setting;
