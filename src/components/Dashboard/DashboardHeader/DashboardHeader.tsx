import { Search } from "lucide-react";

const DashboardHeader = () => {
  return (
    <header className="flex justify-between items-center font-bigShoulders">
      <div>
        <h1 className="text-2xl font-bold font-bigShoulders">
          Khách sạn Phương Trang
        </h1>
        <p className="italic font-thin">
          53 Lê Vĩnh Hoà, Phường Phú Thọ Hoà, Quận Tân Phú, TP HCM
        </p>
      </div>
      <Search />
    </header>
  );
};

export default DashboardHeader;
