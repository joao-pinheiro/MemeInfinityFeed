import React from "react";
import { X, Home, Flame, Heart } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;
  
  return (
    <div className="md:hidden fixed inset-0 bg-neutral-900/80 z-40">
      <div className="h-full w-64 bg-white dark:bg-neutral-800 p-4 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-lg">Menu</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <nav className="flex flex-col space-y-4">
          <a 
            href="#" 
            className="flex items-center space-x-2 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg"
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </a>
          <a 
            href="#" 
            className="flex items-center space-x-2 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg"
          >
            <Flame className="h-5 w-5" />
            <span>Trending</span>
          </a>
          <a 
            href="#" 
            className="flex items-center space-x-2 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg"
          >
            <Heart className="h-5 w-5" />
            <span>Favorites</span>
          </a>
        </nav>
        
        <div className="mt-auto">
          <div className="flex items-center space-x-2 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg w-full">
            <ThemeToggle showText={true} className="w-full justify-start bg-transparent p-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
