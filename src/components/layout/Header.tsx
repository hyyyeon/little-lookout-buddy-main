import React from "react";
import { Link } from "react-router-dom";
import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeaderProps {
  toggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md shadow-sm border-b border-border">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-lookout-blue rounded-full animate-pulse-gentle"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-white">👀</span>
            </div>
          </div>
          <span className="font-bold text-lg text-lookout-dark">아이 지킴이</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-lookout-dark" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-lookout-coral rounded-full"></span>
            <span className="sr-only">Notifications</span>
          </Button>
          <Button 
            className="bg-gradient-to-r from-lookout-blue to-lookout-teal text-white lookout-button hidden md:flex"
          >
            위치 추적하기
          </Button>
        </div>
      </div>
    </header>
  );
};
