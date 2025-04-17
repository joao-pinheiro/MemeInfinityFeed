import React, { useState } from "react";
import { Header } from "@/components/header";
import { MobileMenu } from "@/components/mobile-menu";
import { MemeContainer } from "@/components/meme-container";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };
  
  return (
    <div className="bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 min-h-screen">
      <Header toggleMobileMenu={toggleMobileMenu} />
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      
      <main className="container mx-auto px-4 py-6">
        <MemeContainer />
      </main>
    </div>
  );
}
