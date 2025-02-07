import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useService from '@/lib/useService';
import { Button } from '../button';
import * as React from 'react';
import { TableService } from '../TableService/TableService';
import { createServiceUsage } from '@/services/hotelService';
import { toast } from 'sonner';
import { CreateServiceUsagePayload } from '@/types/service';
import { Spinner } from '@/components/common/Spinner/Spinner';

interface ServiceType {
  roomId: string;
  guestName: string;
  bookingId: string;
}

interface Service {
  documentId: string;
  id: number;
  name: string;
  price: string;
}

export const SelectService = ({ roomId, guestName, bookingId }: ServiceType) => {
  const [serviceId, setServiceId] = React.useState<string>('');
  const [quantity, setQuantity] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { data, loading, error } = useService();

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const payload: CreateServiceUsagePayload = {
        data: {
          service: serviceId,
          quantity: quantity,
          UsageDate: new Date().toISOString(),
          booking: bookingId,
        },
      };
      const response = await createServiceUsage(payload);
      console.log(response.data);
      toast.success('Thêm dịch vụ thành công');
    } catch (error) {
      console.error('Error creating service usage:', error);
      toast.error('Thêm dịch vụ thất bại, vui lòng thử lại');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        {/* Service Select */}
        <Select onValueChange={(value) => setServiceId(value)}>
          <SelectTrigger className="w-[50%] mb-2">
            <SelectValue placeholder="Chọn dịch vụ" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {data.map((service: Service) => (
                <SelectItem key={service.id} value={service.documentId}>
                  {service.name} - {service.price}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Quantity Select */}
        <Select onValueChange={(value) => setQuantity(Number(value))}>
          <SelectTrigger className="w-[48%] mb-2">
            <SelectValue placeholder="Số lượng" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Array.from({ length: 100 }, (_, i) => i + 1).map((number) => (
                <SelectItem key={number} value={number.toString()}>
                  {number}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button className="px-4 py-1 bg-black text-white rounded-lg" type="submit">
          Thêm
        </Button>
      </form>

      <div>
        <TableService bookingId={bookingId} isLoading={isLoading} />
      </div>
    </div>
  );
};
