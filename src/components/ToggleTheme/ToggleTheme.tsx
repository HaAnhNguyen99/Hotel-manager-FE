import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sun, Moon, LaptopMinimal } from "lucide-react";
import { SidebarMenuButton } from "../ui/sidebar";

export function ToggleTheme() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton className="dark:text-white dark:border dark:border-gray-100 border-border border bg-white rounded-lg overflow-hidden dark:bg-transparent">
          <Button variant="ghost" size="icon" tabIndex={-1}>
            <Sun
              className={`w-4 h-4 text-black dark:text-grey-tertiary transition-transform duration-300 ease-in-out text-grey-tertiary${
                theme === "light" ? "rotate-0 scale-100" : "rotate-90 scale-0"
              }`}
            />
            <Moon
              className={`w-4 h-4 absolute text-black dark:text-grey-tertiary  transition-transform duration-300 ease-in-out text-grey-tertiary${
                theme === "dark" ? "rotate-0 scale-100" : "-rotate-90 scale-0"
              }`}
            />

            <LaptopMinimal
              className={`w-4 h-4 absolute text-black dark:text-grey-tertiary  transition-transform duration-300 ease-in-out text-grey-tertiary${
                theme === "system" ? "rotate-0 scale-100" : "-rotate-90 scale-0"
              }`}
            />
          </Button>
          <span>Đổi giao diện</span>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Sáng
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Tối
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          Hệ thống
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
