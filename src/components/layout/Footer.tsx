
import React from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Home, Bell, Target, User, BarChart2, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface FooterProps {
  className?: string;
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  const navItems: NavItem[] = [
    { href: "/", label: "홈", icon: Home },
    { href: "/alerts", label: "알림", icon: Bell },
    { href: "/safezones", label: "구역 설정", icon: Target },
    { href: "/profiles", label: "프로필", icon: User },
    { href: "/ai-reports", label: "AI 분석", icon: BarChart2 },
    { href: "/settings", label: "설정", icon: Settings },
  ];

  if (!isMobile) {
    return (
      <footer className={cn("py-4 md:py-6 bg-white border-t border-border", className)}>
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
            <p className="text-sm text-lookout-gray">
              © 2025 아이 지킴이 (Little Lookout Buddy). All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/terms" className="text-sm text-lookout-gray hover:text-lookout-dark">
                이용약관
              </Link>
              <Link to="/privacy" className="text-sm text-lookout-gray hover:text-lookout-dark">
                개인정보처리방침
              </Link>
              <Link to="/help" className="text-sm text-lookout-gray hover:text-lookout-dark">
                도움말
              </Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <div className={cn("fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-border", className)}>
      <div className="flex items-center justify-around">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex flex-col items-center py-2 px-1 md:px-4",
              location.pathname === item.href
                ? "text-lookout-blue"
                : "text-lookout-gray"
            )}
          >
            <item.icon className="h-4 w-4 md:h-5 md:w-5" />
            <span className="text-[10px] md:text-xs mt-0.5 md:mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};
