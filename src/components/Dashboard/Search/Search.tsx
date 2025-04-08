import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';

interface SearchProps {
  onSearch: (data: { search: string }) => void;
}

const Search = ({ onSearch }: SearchProps) => {
  const { register, handleSubmit } = useForm<{ search: string }>({
    defaultValues: { search: '' },
  });

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit(onSearch)}
        className="flex items-center gap-1 bg-grey-secondaryDark border-border border rounded-xl px-3 pr-4 max-w-72">
        <Input
          id="search"
          placeholder="Tìm kiếm..."
          type="text"
          className="w-full shadow-none border-none border-transparent outline-none focus:outline focus-visible:ring-transparent placeholder:text-border dark:ring-transparent dark:focus:ring-transparent dark:focus-within:outline-none dark:focus:border-0 dark:focus-visible:ring-transparent dark:text-black"
          {...register('search')}
        />
        <label htmlFor="search">
          <SearchIcon className="w-4 h-4 transform rotate-90" color="var(--border-primary)" />
        </label>
        <button type="submit" hidden />
      </form>
    </div>
  );
};

export default Search;
