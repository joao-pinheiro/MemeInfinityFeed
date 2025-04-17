import React from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SmilePlus, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  toggleMobileMenu: () => void;
}

export function Header({ toggleMobileMenu }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-neutral-900 shadow-sm dark:shadow-neutral-800">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <SmilePlus className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">MemeScroll</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-neutral-800 dark:text-neutral-50"
            onClick={toggleMobileMenu}
          >
            <Menu className="h-6 w-6" />
          </Button>
          
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
