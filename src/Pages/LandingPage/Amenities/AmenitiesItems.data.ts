import { TbFireExtinguisher, TbToolsKitchen2 } from "react-icons/tb";
import { IoMdTv, IoIosWifi, IoIosSnow } from "react-icons/io";
import { BiSolidWasher } from "react-icons/bi";
import { MdOutlineDryCleaning } from "react-icons/md";
import { FaShieldVirus } from "react-icons/fa";
import { SiAdguard } from "react-icons/si";
import { ConciergeBell } from "lucide-react";

export const Amenities = [
  { icon: TbToolsKitchen2, title: "Bếp" },
  { icon: IoIosWifi, title: "Wifi" },
  { icon: IoMdTv, title: "TV" },
  { icon: BiSolidWasher, title: "Máy giặt" },
  { icon: IoIosSnow, title: "Máy lạnh" },
  { icon: ConciergeBell, title: "Lễ tân 24/7" },
];

export const Safety = [
  { icon: MdOutlineDryCleaning, title: "Dọn dẹp hàng ngày" },
  { icon: TbFireExtinguisher, title: "Bình chữa cháy" },
  { icon: FaShieldVirus, title: "Khử trùng và Tiệt trùng" },
  { icon: SiAdguard, title: "Máy dò khói" },
];
