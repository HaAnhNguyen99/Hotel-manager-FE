import { Button } from '@/components/ui/button';
import Ellipsis from '@/assets/svg/ellipsis.svg';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState } from 'react';

const PopupCard = ({ handleDeleteCardItem, title }: { handleDeleteCardItem: (title: string) => void; title: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="p-0 hover:bg-transparent active:scale-95 dark:hover:bg-transparent flex-shrink-0">
          <img src={Ellipsis} alt="eliipsis icon" width={25} className="fill-white dark:fill-white" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0">
        <Button
          onClick={() => {
            setOpen(false);
            handleDeleteCardItem(title);
          }}
          className="h-fit dark:text-black">
          Ẩn
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default PopupCard;
