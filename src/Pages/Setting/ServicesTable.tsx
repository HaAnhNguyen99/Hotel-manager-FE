import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ServiceData } from "@/types/service";
import DeleteConfirm from "./DeleteConfirm";
import ServiceFormDialog from "./ServiceFormDialog";
import { Button } from "@/components/ui/button";
import { useServiceContext } from "@/context/ServiceContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatDateTime } from "@/utils/FormatDate";

interface ServicesTableProps {
  ServiceData: ServiceData[] | undefined;
}

const ServicesTable = ({ ServiceData }: ServicesTableProps) => {
  const { pagination, handlePaginationService } = useServiceContext();

  return (
    <div className="border rounded-2xl border-neutral-200 shadow-md p-2 mt-10 px-7">
      <Table className="mt-10">
        <TableHeader className="bg-[#f9fafb] h-10">
          <TableRow>
            <TableHead className="text-center">Id</TableHead>
            <TableHead className="text-center">Hình ảnh</TableHead>
            <TableHead className="text-center">Tên dịch vụ</TableHead>
            <TableHead className="text-center">Giá</TableHead>
            <TableHead className="text-center">Lần sửa gần nhất</TableHead>
            <TableHead className="text-center">Hành động</TableHead>
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
                  className="w-16 h-16 rounded-full border border-neutral-400"
                />
              </TableCell>
              <TableCell className="font-medium">{service.name}</TableCell>
              <TableCell>{service.price}</TableCell>
              <TableCell>{formatDateTime(service.updatedAt)}</TableCell>
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
      <div className="flex justify-between w-full mt-4 mx-auto text-gray-400 text-sm mb-10">
        <div>
          <p className="flex">
            <span>Trang {pagination?.page} </span>
            <span>/</span>
            <span>{pagination.pageCount}</span>
          </p>
        </div>
        <div className="flex gap-1 max-h-5">
          <Button
            className="h-full bg-gray-300"
            disabled={pagination.page <= 1}
            onClick={() => {
              if (pagination.page > 1) {
                handlePaginationService(pagination.page - 1);
              }
            }}>
            <ChevronLeft />
          </Button>

          <Button
            className="h-full bg-gray-300"
            disabled={pagination.page >= pagination.pageCount}
            onClick={() => {
              if (pagination.page < pagination.pageCount) {
                handlePaginationService(pagination.page + 1);
              }
            }}>
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServicesTable;
