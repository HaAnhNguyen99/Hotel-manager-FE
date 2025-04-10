import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sun, Moon, LaptopMinimal } from "lucide-react";

export function ToggleTheme() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relativ w-full dark:bg-transparent dark:border dark:border-gray-100"
          tabIndex={-1}>
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

          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
