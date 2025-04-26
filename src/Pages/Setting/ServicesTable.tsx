import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ServiceData } from "@/types/service";
import DeleteConfirm from "./DeleteConfirm";
import ServiceFormDialog from "./ServiceFormDialog";

interface ServicesTableProps {
  ServiceData: ServiceData[] | undefined;
}

const ServicesTable = ({ ServiceData }: ServicesTableProps) => {
  return (
    <Table className="mt-10">
      <TableCaption>Danh sách dịch vụ</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Id</TableHead>
          <TableHead className="text-center">Hình ảnh</TableHead>
          <TableHead className="text-center">Tên dịch vụ</TableHead>
          <TableHead className="text-center">Giá</TableHead>
          <TableHead className="text-center">...</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-center">
        {ServiceData?.map((service) => (
          <TableRow key={service.id}>
            <TableCell className="font-medium">{service.id}</TableCell>
            <TableCell className="flex justify-center">
              <img
                src={service.img?.url}
                alt={service.name}
                className="w-16 h-16 rounded-full"
              />
            </TableCell>
            <TableCell className="font-medium">{service.name}</TableCell>
            <TableCell>{service.price}</TableCell>
            <TableCell className="m-auto h-full">
              <div className="flex gap-2 justify-center">
                <ServiceFormDialog services={service} />
                <DeleteConfirm service={service} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ServicesTable;
