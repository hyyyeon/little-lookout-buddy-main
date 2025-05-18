
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Target } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface KakaoMapProps {
  className?: string;
  childLocation?: { lat: number; lng: number };
  safeZoneRadius?: number;
  onSafeZoneChange?: (radius: number) => void;
  riskZones?: RiskZone[];
}

export interface RiskZone {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  radius: number;
  riskLevel: 'normal' | 'high';
  schedule?: {
    startTime: string;
    endTime: string;
  };
}

export const KakaoMap: React.FC<KakaoMapProps> = ({ 
  className,
  childLocation = { lat: 37.5665, lng: 126.9780 }, // Default: Seoul
  safeZoneRadius = 15,
  onSafeZoneChange,
  riskZones = []
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isAdjustingSafeZone, setIsAdjustingSafeZone] = useState(false);
  
  // In a real implementation, you'd integrate with the actual Kakao Maps API
  useEffect(() => {
    // This would typically load the Kakao Maps API script
    console.log("Kakao Map would be initialized here");
    
    return () => {
      console.log("Kakao Map would be cleaned up here");
    };
  }, []);

  const handleSafeZoneChange = (value: number[]) => {
    if (onSafeZoneChange) {
      onSafeZoneChange(value[0]);
    }
  };

  return (
    <div className={cn("lookout-card overflow-hidden", className)}>
      <div ref={mapRef} className="h-64 bg-lookout-teal/10 relative">
        {/* Map placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lookout-dark font-medium">카카오 지도 표시 영역</p>
            <p className="text-sm text-lookout-gray">실제 앱에서는 카카오 지도가 표시됩니다</p>
          </div>
        </div>
        
        {/* Child location indicator */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-6 h-6 bg-lookout-blue rounded-full flex items-center justify-center border-2 border-white animate-pulse-gentle">
            <span className="text-xs text-white">👶</span>
          </div>
          <div className="w-24 h-24 bg-lookout-blue/20 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        </div>
        
        {/* Safe area radius */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-40 h-40 border-2 border-dashed border-lookout-green/70 rounded-full"></div>
        </div>
        
        {/* Risk zones visualization */}
        {riskZones.map((zone) => (
          <div 
            key={zone.id} 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{ 
              width: `${zone.radius * 2}px`, 
              height: `${zone.radius * 2}px`,
              zIndex: 5
            }}
          >
            <div 
              className={cn(
                "w-full h-full rounded-full border-2 border-dashed",
                zone.riskLevel === 'high' 
                  ? "border-red-500 bg-red-500/10 animate-pulse" 
                  : "border-orange-400 bg-orange-300/10"
              )}
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-1 rounded text-xs">
              {zone.name}
            </div>
          </div>
        ))}

        {/* Map controls */}
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <Button size="icon" variant="outline" className="bg-white">
            <Target className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline" className="bg-white">
            <Navigation className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="p-4 bg-white">
        <h3 className="font-medium text-lookout-dark">현재 위치</h3>
        <p className="text-sm text-lookout-gray">서울특별시 강남구 선릉로</p>
        
        <div className="flex items-center justify-between mt-3">
          <div>
            <p className="text-xs text-lookout-gray">안전 반경</p>
            <p className="text-sm font-medium text-lookout-dark">{safeZoneRadius}m</p>
          </div>
          <div>
            <p className="text-xs text-lookout-gray">마지막 업데이트</p>
            <p className="text-sm font-medium text-lookout-dark">1분 전</p>
          </div>
          <div>
            <p className="text-xs text-lookout-gray">배터리</p>
            <p className="text-sm font-medium text-lookout-dark">85%</p>
          </div>
        </div>

        {/* Safe zone adjustment slider */}
        {isAdjustingSafeZone ? (
          <div className="mt-4 space-y-2">
            <label className="text-xs text-lookout-gray">안전 반경 조정 ({safeZoneRadius}m)</label>
            <Slider 
              defaultValue={[safeZoneRadius]} 
              min={10} 
              max={100} 
              step={5}
              onValueChange={handleSafeZoneChange}
              className="my-4"
            />
            <div className="flex justify-end">
              <Button size="sm" onClick={() => setIsAdjustingSafeZone(false)}>
                완료
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-4">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setIsAdjustingSafeZone(true)}
            >
              안전 반경 조정
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
