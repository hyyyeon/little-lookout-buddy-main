
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Bell, Target, User, BarChart2, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navItems: NavItem[] = [
    { href: "/", label: "홈", icon: Home },
    { href: "/alerts", label: "알림", icon: Bell },
    { href: "/safezones", label: "구역 설정", icon: Target },
    { href: "/profiles", label: "프로필 관리", icon: User },
    { href: "/ai-reports", label: "AI 분석 리포트", icon: BarChart2 },
    { href: "/settings", label: "설정", icon: Settings },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-border transform transition-transform duration-300 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-center gap-2 h-16">
              <div className="w-12 h-12 bg-gradient-to-tr from-lookout-blue to-lookout-teal rounded-full flex items-center justify-center">
                <span className="text-xl text-white">👀</span>
              </div>
              <div>
                <h2 className="font-bold text-lg">아이 지킴이</h2>
                <p className="text-xs text-lookout-gray">Little Lookout Buddy</p>
              </div>
            </div>
          </div>
          
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors",
                  location.pathname === item.href
                    ? "bg-lookout-blue/10 text-lookout-blue font-medium"
                    : "text-lookout-dark hover:bg-muted"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          
          <div className="p-4 border-t border-border">
            <div className="bg-lookout-beige/50 rounded-lg p-3">
              <p className="text-sm text-lookout-dark font-medium">안전한 지킴이 모드</p>
              <p className="text-xs text-lookout-gray">아이의 위치를 15m 이내로 유지하세요</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
