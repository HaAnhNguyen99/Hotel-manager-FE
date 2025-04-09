import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getHotelProfile } from "@/services/hotelService";
import {
  Home,
  LayoutDashboard,
  LogOut,
  RefreshCcw,
  Settings,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { NavLink } from "react-router-dom";
import { ToggleTheme } from "@/components/ToggleTheme/ToggleTheme";
import { useUserContext } from "@/context/UserContext";
import ChangePassword from "./ChangePassword";

function SkeletonSidebarHeader() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
    </div>
  );
}

const items = [
  {
    title: "Phòng",
    url: "/home",
    icon: Home,
  },
  {
    title: "Thống kê",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Settings",
    url: "/setting",
    icon: Settings,
  },
];
const AppSidebar = () => {
  const [hotelProfile, setHotelProfile] = useState({
    logo: {
      name: "",
      url: "",
    },
    name: "",
    address: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);

  const { logoutUser } = useUserContext();
  const { state, open } = useSidebar();

  useEffect(() => {
    if (open) {
      localStorage.setItem("sidebar_state", "true");
    } else {
      localStorage.setItem("sidebar_state", "false");
    }
  }, [open]);

  useEffect(() => {
    const fetchHotelProfile = async () => {
      try {
        setLoading(true);
        const data = await getHotelProfile();
        const { logo, name, address, phone } = data;
        setHotelProfile({ logo, name, address, phone });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchHotelProfile();
  }, []);

  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      className="sidebar-shadow bg-sidebar dark:bg-[#1e1e1e]">
      <SidebarHeader className="flex md:flex-row gap-2 items-center justify-center dark:bg-[#1e1e1e]">
        {loading ? (
          <SkeletonSidebarHeader />
        ) : (
          <>
            <NavLink to="/" className=" rounded-lg overflow-hidden ">
              <img
                src={hotelProfile.logo?.url}
                alt={hotelProfile.logo?.name}
                width={50}
                height={50}
                className={`${loading ? "animate-pulse" : ""}`}
              />
            </NavLink>
            <p
              className={`${
                state === "collapsed" ? "hidden" : "block"
              }  text-base font-bold dark:text-grey`}>
              {hotelProfile.name}
            </p>
          </>
        )}
      </SidebarHeader>
      <SidebarContent className="dark:bg-[#1e1e1e] dark:text-grey">
        <SidebarGroup>
          <SidebarGroupLabel>Điều hướng</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink
                    to={item.url}
                    className={({ isActive }) =>
                      isActive
                        ? "text-white font-semibold flex items-center gap-2 bg-yellow rounded-lg"
                        : "flex items-center gap-2 rounded-lg text-black dark:text-grey-tertiary"
                    }>
                    <SidebarMenuButton className="hover:bg-neutral-500 hover:rounded-lg hover:text-white">
                      <item.icon className="w-3 h-3" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="dark:bg-[#1e1e1e]">
        <SidebarGroupContent>
          <SidebarMenu>
            {/* Change Password */}
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="cursor-pointer border border-border dark:bg-white dark:hover:bg-transparent">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setOpenChangePassword((prev) => !prev)}>
                    <RefreshCcw className="w-4 h-4" />
                  </button>
                  <ChangePassword
                    setOpen={setOpenChangePassword}
                    open={openChangePassword}
                  />
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {/* Log out */}
            <SidebarMenuItem>
              <SidebarMenuButton
                className="border p-2 bg-white rounded-lg overflow-hidden"
                onClick={logoutUser}>
                <LogOut />
                <span>Đăng xuất</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {/* Toggle theme */}
            <SidebarMenuItem>
              <ToggleTheme />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
