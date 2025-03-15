import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sun, Moon, LaptopMinimal } from "lucide-react";
import { useEffect } from "react";

export function ToggleTheme() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative"
          tabIndex={-1}>
          <Sun
            className={`h-[1.2rem] text-black w-[1.2rem] transition-transform duration-300 ease-in-out ${
              theme === "light" ? "rotate-0 scale-100" : "rotate-90 scale-0"
            }`}
          />
          <Moon
            className={`absolute text-black h-[1.2rem] w-[1.2rem] transition-transform duration-300 ease-in-out ${
              theme === "dark" ? "rotate-0 scale-100" : "-rotate-90 scale-0"
            }`}
          />

          <LaptopMinimal
            className={`absolute text-black h-[1.2rem] w-[1.2rem] transition-transform duration-300 ease-in-out ${
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
