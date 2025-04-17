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
      
      <style jsx global>{`
        /* Scroll bar styling */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        
        /* Video and image containers */
        .video-container {
          position: relative;
          padding-bottom: 100%;
          overflow: hidden;
        }
        
        .video-container video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          background-color: #000;
        }
        
        .image-container {
          position: relative;
          padding-bottom: 100%;
          overflow: hidden;
        }
        
        .image-container img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        
        /* Upvote animation */
        @keyframes upvote-pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        
        .upvote-animate {
          animation: upvote-pop 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
