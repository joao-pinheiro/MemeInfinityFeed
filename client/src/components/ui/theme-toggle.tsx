import React from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

interface ThemeToggleProps {
  className?: string;
  showText?: boolean;
}

export function ThemeToggle({ className, showText = true }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleTheme}
      className={`flex items-center space-x-1 px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full text-sm ${className || ""}`}
    >
      {theme === "dark" ? (
        <>
          <Sun className="h-4 w-4" />
          {showText && <span>Light Mode</span>}
        </>
      ) : (
        <>
          <Moon className="h-4 w-4" />
          {showText && <span>Dark Mode</span>}
        </>
      )}
    </Button>
  );
}
