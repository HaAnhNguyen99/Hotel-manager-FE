import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getHotelProfile } from "@/services/hotelService";
import {
  Home,
  LayoutDashboard,
  LogOut,
  MoreHorizontal,
  Plus,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

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
            {/* Toggle theme */}
            <SidebarMenuItem>
              <ToggleTheme />
            </SidebarMenuItem>
            {/* Change Password */}
            <SidebarMenuItem>
              <ChangePassword />
            </SidebarMenuItem>
            {/* Log out */}
            <SidebarMenuItem className="w-full">
              <SidebarMenuButton
                className="dark:text-white dark:border dark:border-gray-100 border-border border bg-white rounded-lg overflow-hidden dark:bg-transparent"
                onClick={logoutUser}>
                <Button variant="ghost" size="icon" tabIndex={-1}>
                  <LogOut className="w-4 h-4" />
                </Button>
                <span>Đăng xuất</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
