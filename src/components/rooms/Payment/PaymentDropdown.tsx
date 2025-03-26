import { Command, CommandEmpty, CommandList } from "@/components/ui/command";
import { useState } from "react";
import { IoMdCash } from "react-icons/io";
import { RiBankFill } from "react-icons/ri";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { CommandGroup, CommandItem } from "@/components/ui/command";
import { PaymentMethod } from "@/types/payment";

const paymentMethods = [
  {
    label: "Tiền mặt",
    value: PaymentMethod.Cash,
    icon: <IoMdCash className="mr-2" />,
  },
  {
    label: "Chuyển khoản",
    value: PaymentMethod.Banking,
    icon: <RiBankFill className="mr-2" />,
  },
];

const PaymentDropdown = ({
  setSelectedMethod,
  selectedMethod,
}: {
  setSelectedMethod: React.Dispatch<React.SetStateAction<PaymentMethod>>;
  selectedMethod: PaymentMethod;
}) => {
  const [open, setOpen] = useState(false);

  const selectedMethodLabel = paymentMethods.find(
    (method) => method.value === selectedMethod
  )?.label;

  const selectedMethodIcon = paymentMethods.find(
    (method) => method.value === selectedMethod
  )?.icon;

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-72 justify-between">
          <div className="flex items-center">
            {selectedMethodIcon}
            {selectedMethodLabel}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-2">
        <Command>
          <CommandList>
            <CommandEmpty>Không tìm thấy phương thức thanh toán.</CommandEmpty>
            <CommandGroup>
              {paymentMethods.map((method) => (
                <CommandItem
                  key={method.value}
                  value={method.value}
                  onSelect={(currentValue) => {
                    console.log(currentValue);
                    setSelectedMethod(currentValue as PaymentMethod);
                    setOpen(false);
                  }}
                  className="flex items-center cursor-pointer">
                  {method.icon}
                  <span>{method.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default PaymentDropdown;
