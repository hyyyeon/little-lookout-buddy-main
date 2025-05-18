import React from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface Alert {
  id: string;
  type: "boundary" | "distance" | "movement" | "battery";
  message: string;
  time: string;
  read: boolean;
}

interface RecentAlertsProps {
  alerts: Alert[];
  className?: string;
}

export const RecentAlerts: React.FC<RecentAlertsProps> = ({ 
  alerts, 
  className 
}) => {
  const isMobile = useIsMobile();
  
  const getAlertIcon = (type: string) => {
    switch(type) {
      case "boundary": return "🚨";
      case "distance": return "📏";
      case "movement": return "🏃‍♂️";
      case "battery": return "🔋";
      default: return "ℹ️";
    }
  };

  return (
    <div className={cn("lookout-card", className)}>
      <div className="p-2 sm:p-3 md:p-4 border-b border-border">
        <h3 className="font-semibold text-lookout-dark text-xs sm:text-sm md:text-base">최근 알림</h3>
      </div>
      
      <div className="divide-y divide-border max-h-[180px] sm:max-h-[200px] md:max-h-none overflow-auto">
        {alerts.length === 0 ? (
          <div className="p-2 sm:p-3 md:p-4 text-center">
            <p className="text-xs sm:text-sm text-lookout-gray">새로운 알림이 없습니다</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div 
              key={alert.id}
              className={cn(
                "p-2 sm:p-3 md:p-4 flex items-start gap-2 sm:gap-2.5 md:gap-3 hover:bg-muted/30 transition-colors",
                !alert.read && "bg-lookout-blue/5"
              )}
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 flex-shrink-0 bg-lookout-beige/50 rounded-full flex items-center justify-center">
                <span className="text-sm sm:text-base">{getAlertIcon(alert.type)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-lookout-dark font-medium line-clamp-2">
                  {alert.message}
                </p>
                <p className="text-[10px] sm:text-xs text-lookout-gray mt-0.5 sm:mt-1">
                  {alert.time}
                </p>
              </div>
              {!alert.read && (
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-lookout-blue rounded-full flex-shrink-0"></div>
              )}
            </div>
          ))
        )}
      </div>
      
      {alerts.length > 0 && (
        <div className="p-2 md:p-3 text-center border-t border-border">
          <button className="text-xs md:text-sm text-lookout-blue hover:underline">
            모든 알림 보기
          </button>
        </div>
      )}
    </div>
  );
};
