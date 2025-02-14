import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const CancelBookingPopover = ({ handleCancelBooking }: { handleCancelBooking: () => Promise<void> }) => {
  const handleCancel = (confirmed: boolean) => {
    if (confirmed) {
      toast.success('Đã huỷ đặt phòng');
      handleCancelBooking();
    } else {
      toast.error('Huỷ đặt phòng thất bại');
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Huỷ đặt phòng</Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-4">
        <div className="flex flex-col space-y-2">
          <p className="text-sm font-medium">Bạn có chắc chắn muốn huỷ đặt phòng?</p>
          <div className="flex space-x-2">
            <Button variant="destructive" onClick={() => handleCancel(true)} className="w-full">
              Có
            </Button>
            <Button variant="outline" onClick={() => handleCancel(false)} className="w-full">
              Không
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CancelBookingPopover;
