import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceData } from "@/types/service";
import { Separator } from "@/components/ui/separator";
import { useServiceContext } from "@/context/ServiceContext";

const DeleteConfirm = ({ service }: { service: ServiceData }) => {
  const [open, setOpen] = useState(false);
  const { handleDelete } = useServiceContext();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <button className="bg-red-500 text-white  px-4 py-2 rounded-lg flex gap-1 items-center h-10">
          <Trash2 />
          Xoá
        </button>
      </DialogTrigger>
      <DialogContent className="p-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Xác nhận xoá</CardTitle>
            <Separator className=" mx-auto my-5" />
          </CardHeader>
          <CardContent className="text-center max-w-prose space-y-4">
            <div className="p-5 rounded-full bg-red-200 text-red-700 w-fit mx-auto">
              <Trash2 />
            </div>
            <p>Bạn có chắc chắn muốn xoá dịch vụ này?</p>

            <div className="p-4 border rounded-lg w-fit  mx-auto">
              <p className="font-bold text-lg">{service.name}</p>
              <p className="text-blue-600">
                {Number(service.price).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            </div>
            <p className="text-base text-neutral-400">
              <span className="text-red-500">Lưu ý:</span> Dịch vụ sẽ bị xoá
              hoàn toàn và không thể khôi phục lại.
            </p>
          </CardContent>
          <CardFooter className="flex justify-between gap-2">
            <Button
              variant="outline"
              className="flex-1 font-bold tracking-wide"
              onClick={() => setOpen(false)}>
              Huỷ
            </Button>
            <Button
              variant="destructive"
              className="flex-1 font-bold tracking-wide"
              onClick={() => handleDelete(service.documentId)}>
              Xoá
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirm;
