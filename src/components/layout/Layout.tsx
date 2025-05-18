import React, { useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
  noPadding?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, noPadding = false }) => {
  const isMobile = useIsMobile();

  return (
    <div className="relative min-h-screen flex flex-col" style={isMobile ? {width: '100%', height: '100vh', margin: '0 auto'} : {}}>
      <Header toggleSidebar={() => {}} />
      <main className={`flex-1 ${noPadding ? 'p-0' : 'p-2 sm:p-4 md:p-6'} pt-2 pb-16 md:pb-0`}>
        <div className={`${noPadding ? '' : 'container mx-auto'}`}>
          {children}
        </div>
      </main>
      <Footer className={isMobile ? "h-16" : ""} />
      {isMobile && <div className="h-16"></div>}
    </div>
  );
};
