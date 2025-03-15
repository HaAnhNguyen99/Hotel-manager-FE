import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <>
      <div className="w-fit mx-auto flex items-center gap-1 border-border border rounded-full px-3 py-1 max-w-72">
        <label htmlFor="search">
          <SearchIcon className="w-4 h-4" color="hsl(var(--border-primary))" />
        </label>
        <Input
          id="search"
          placeholder="Tìm kiếm..."
          type="text"
          className="w-full border-none border-transparent outline-none focus:outline focus-visible:ring-transparent placeholder:text-border"
        />
      </div>
    </>
  );
};

export default Search;
