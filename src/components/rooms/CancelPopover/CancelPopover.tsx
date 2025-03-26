import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CancelPopoverProps {
  cancelFunction: () => Promise<void>;
  title: string;
  description: string;
  icon?: React.ReactNode;
  buttonVariant?: "default" | "outline" | "ghost" | "destructive";
  className?: string;
  loading?: boolean;
}

const CancelPopover = ({
  cancelFunction,
  title,
  description,
  icon,
  buttonVariant = "outline",
  className,
  loading = false,
}: CancelPopoverProps) => {
  const handleCancel = (confirmed: boolean) => {
    if (confirmed) {
      toast.success(`Đã ${title.toLowerCase()}`);
      cancelFunction();
    } else {
      toast.error(`${title} thất bại`);
    }
  };

  if (loading) {
    title = "...";
  }

  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button variant={buttonVariant} className={className}>
          {buttonVariant === "ghost" ? (
            <span className="sr-only">{title}</span>
          ) : (
            title
          )}
          {icon}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit text-center p-4 ">
        <div className="flex flex-col space-y-2">
          <p className="text-sm font-medium">{description}</p>
          <div className="flex space-x-2">
            <Button
              variant="destructive"
              onClick={() => handleCancel(true)}
              className="w-full">
              Có
            </Button>
            <Button
              variant="outline"
              onClick={() => handleCancel(false)}
              className="w-full">
              Không
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CancelPopover;
