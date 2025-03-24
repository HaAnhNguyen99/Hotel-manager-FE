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
import { Home, LayoutDashboard, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { NavLink } from "react-router-dom";
import { ToggleTheme } from "@/components/ToggleTheme/ToggleTheme";

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
    url: "/",
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
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="flex md:flex-row gap-2 items-center justify-center">
        {loading ? (
          <SkeletonSidebarHeader />
        ) : (
          <>
            <a href="#" className=" rounded-lg overflow-hidden ">
              <img
                src={hotelProfile.logo?.url}
                alt={hotelProfile.logo?.name}
                width={50}
                height={50}
                className={`${loading ? "animate-pulse" : ""}`}
              />
            </a>
            <p
              className={`${
                state === "collapsed" ? "hidden" : "block"
              }  text-base font-bold`}>
              {hotelProfile.name}
            </p>
          </>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Điều hướng</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) => {
                        console.log(isActive);
                        return isActive
                          ? "text-primary font-semibold"
                          : "text-muted-foreground hover:text-primary";
                      }}>
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <ToggleTheme />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
