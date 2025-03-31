import { useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { getSearchData } from "@/services/hotelService";
import { RevenueData } from "@/types/reservation";

const Search = () => {
  const { register, handleSubmit } = useForm<{ search: string }>();
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState<RevenueData[] | undefined>();

  const onSubmit = async (data: { search: string }) => {
    setLoading(true);
    try {
      const response = await getSearchData(data.search);
      setSearchData(response.data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-1 bg-grey-secondaryDark border-border border rounded-xl px-3 pr-4 max-w-72">
        <Input
          id="search"
          placeholder="Tìm kiếm..."
          type="text"
          className="w-full shadow-none border-none border-transparent outline-none focus:outline focus-visible:ring-transparent placeholder:text-border"
          {...register("search")}
        />
        <label htmlFor="search">
          <SearchIcon
            className="w-4 h-4 transform rotate-90 "
            color="hsl(var(--border-primary))"
          />
        </label>
        <button type="submit" hidden />
      </form>
      {/* <div className="absolute -bottom-6 left-0 right-0 border-border border px-3 ">
        {loading
          ? "Loading..."
          : searchData?.map((item, index) => <p key={index}>{item.id}</p>)}
      </div> */}
    </div>
  );
};

export default Search;
