import { TbFireExtinguisher, TbToolsKitchen2 } from "react-icons/tb";
import { IoMdTv, IoIosWifi, IoIosSnow } from "react-icons/io";
import { BiSolidWasher } from "react-icons/bi";
import { MdOutlineDryCleaning } from "react-icons/md";
import { FaShieldVirus } from "react-icons/fa";
import { SiAdguard } from "react-icons/si";

export const Amenities = [
  { icon: TbToolsKitchen2, title: "Bếp" },
  { icon: IoIosWifi, title: "Wifi" },
  { icon: IoMdTv, title: "TV" },
  { icon: BiSolidWasher, title: "Máy giặt" },
  { icon: IoIosSnow, title: "Máy lạnh" },
];

export const Safety = [
  { icon: MdOutlineDryCleaning, title: "Dọn dẹp hàng ngày" },
  { icon: FaShieldVirus, title: "Khử trùng và Tiệt trùng" },
  { icon: TbFireExtinguisher, title: "Bình chữa cháy" },
  { icon: SiAdguard, title: "Máy dò khói" },
];
