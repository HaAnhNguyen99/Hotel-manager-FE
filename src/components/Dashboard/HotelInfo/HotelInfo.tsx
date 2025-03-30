import logo from "@/assets/images/logo v2 dark.jpeg";

const HotelInfo = () => {
  return (
    <div className="flex gap-3 justify-between items-center font-bigShoulders text-right">
      <div>
        <h1 className="text-2xl font-extrabold font-bigShoulders italic">
          Khách sạn Phương Trang
        </h1>
        <p className="italic font-thin mt-2">
          53 Lê Vĩnh Hoà, Phường Phú Thọ Hoà, Quận Tân Phú, TP HCM
        </p>
      </div>
      <div className="aspect-square w-14 rounded-2xl overflow-hidden">
        <img src={logo} alt="hotel Phuong trang loo" className="object-cover" />
      </div>
    </div>
  );
};

export default HotelInfo;
