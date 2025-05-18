
import React from "react";
import { cn } from "@/lib/utils";
import { KakaoMap } from "./KakaoMap";

interface LocationMapProps {
  className?: string;
}

export const LocationMap: React.FC<LocationMapProps> = ({ className }) => {
  // Sample risk zones for demonstration
  const sampleRiskZones = [
    {
      id: "1",
      name: "공사장",
      location: { lat: 37.566, lng: 126.978 },
      radius: 70,
      riskLevel: "high" as const,
    }
  ];

  return (
    <KakaoMap 
      className={className} 
      riskZones={sampleRiskZones}
    />
  );
};
