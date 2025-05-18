
import React from "react";
import { cn } from "@/lib/utils";

interface SafetyStatusCardProps {
  status: "safe" | "warning" | "danger";
  className?: string;
}

export const SafetyStatusCard: React.FC<SafetyStatusCardProps> = ({ 
  status, 
  className 
}) => {
  const getStatusConfig = (status: string) => {
    switch(status) {
      case "safe":
        return {
          bgColor: "bg-lookout-green/10",
          borderColor: "border-lookout-green",
          textColor: "text-green-700",
          icon: "🛡️",
          title: "안전",
          description: "아이가 안전 구역 내에 있습니다"
        };
      case "warning":
        return {
          bgColor: "bg-lookout-yellow/10",
          borderColor: "border-lookout-yellow",
          textColor: "text-yellow-700",
          icon: "⚠️",
          title: "주의",
          description: "아이가 안전 구역을 벗어나기 시작했습니다"
        };
      case "danger":
        return {
          bgColor: "bg-lookout-coral/10",
          borderColor: "border-lookout-coral",
          textColor: "text-red-600",
          icon: "🚨",
          title: "위험",
          description: "아이가 안전 구역을 벗어났습니다"
        };
      default:
        return {
          bgColor: "bg-lookout-green/10",
          borderColor: "border-lookout-green",
          textColor: "text-green-700",
          icon: "🛡️",
          title: "안전",
          description: "아이가 안전 구역 내에 있습니다"
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div 
      className={cn(
        "rounded-xl p-4 border",
        config.bgColor,
        config.borderColor,
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="text-2xl">{config.icon}</div>
        <div>
          <h3 className={cn("font-semibold", config.textColor)}>
            {config.title}
          </h3>
          <p className="text-sm text-lookout-gray">
            {config.description}
          </p>
        </div>
      </div>
    </div>
  );
};
