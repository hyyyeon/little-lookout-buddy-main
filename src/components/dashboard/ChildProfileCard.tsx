import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Eye, MessageCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface Child {
  id: string;
  name: string;
  age: number;
  imageUrl: string;
  status: "safe" | "warning" | "danger";
  lastLocation: string;
  distance: number;
}

interface ChildProfileCardProps {
  child: Child;
  className?: string;
}

export const ChildProfileCard: React.FC<ChildProfileCardProps> = ({ 
  child, 
  className 
}) => {
  const isMobile = useIsMobile();
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case "safe": return "text-green-600";
      case "warning": return "text-amber-500";
      case "danger": return "text-red-600";
      default: return "text-green-600";
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case "safe": return "안전";
      case "warning": return "주의";
      case "danger": return "위험";
      default: return "안전";
    }
  };

  return (
    <div className={cn("lookout-card border border-border overflow-hidden", className)}>
      <div className="flex flex-col items-center p-3 sm:p-4">
        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-lookout-blue mb-2 sm:mb-3">
          <img 
            src={child.imageUrl} 
            alt={child.name}
            className="w-full h-full object-cover" 
          />
        </div>
        <h3 className="font-semibold text-lookout-dark text-sm sm:text-base md:text-lg">{child.name}</h3>
        <p className="text-xs sm:text-sm text-lookout-gray">{child.age}세</p>
        
        <div className="flex items-center gap-1 mt-1 sm:mt-2">
          <div className={cn(
            "w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full",
            child.status === "safe" ? "bg-green-500" : 
            child.status === "warning" ? "bg-amber-500" : "bg-red-500"
          )}></div>
          <span className={cn(
            "text-xs sm:text-sm font-medium",
            getStatusColor(child.status)
          )}>
            {getStatusText(child.status)}
          </span>
        </div>
        
        <div className="w-full grid grid-cols-2 gap-1 md:gap-2 mt-2 md:mt-3">
          <Button size={isMobile ? "sm" : "default"} variant="outline" className="text-xs md:text-sm">
            <Eye className="h-3 w-3 md:h-4 md:w-4 mr-1" />
            위치 보기
          </Button>
          <Button size={isMobile ? "sm" : "default"} className="bg-lookout-blue text-white text-xs md:text-sm">
            <MessageCircle className="h-3 w-3 md:h-4 md:w-4 mr-1" />
            SOS 호출
          </Button>
        </div>
      </div>
      
      <div className="bg-lookout-blue/5 border-t border-lookout-blue/20 p-3 md:p-4">
        <div className="grid grid-cols-2 gap-1 md:gap-2">
          <div>
            <p className="text-[10px] md:text-xs text-lookout-gray">마지막 위치</p>
            <p className="text-xs md:text-sm font-medium text-lookout-dark truncate">{child.lastLocation}</p>
          </div>
          <div>
            <p className="text-[10px] md:text-xs text-lookout-gray">거리</p>
            <p className="text-xs md:text-sm font-medium text-lookout-dark">{child.distance}m</p>
          </div>
        </div>
      </div>
    </div>
  );
};
