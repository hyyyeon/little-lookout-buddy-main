
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Target, Plus, Minus, Compass, Shield } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface NaverMapProps {
  className?: string;
  childLocation?: { lat: number; lng: number };
  safeZoneRadius?: number;
  onSafeZoneChange?: (radius: number) => void;
  showControls?: boolean;
  mode?: "view" | "edit";
  mapType?: "standard" | "satellite";
  compactView?: boolean;
  hideZoneControls?: boolean;
}

export const NaverMap: React.FC<NaverMapProps> = ({ 
  className,
  childLocation = { lat: 37.7247, lng: 126.7327 }, // Default: 파주와동초등학교병설유치원
  safeZoneRadius = 15,
  onSafeZoneChange,
  showControls = true,
  mode = "view",
  mapType = "standard",
  compactView = false,
  hideZoneControls = false
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(safeZoneRadius);
  const [activeTab, setActiveTab] = useState("location");

  useEffect(() => {
    console.log("Naver Map would be initialized here with location:", childLocation);
    
    return () => {
      console.log("Naver Map would be cleaned up here");
    };
  }, [childLocation]);

  const handleRadiusChange = (value: number[]) => {
    const newRadius = value[0];
    setRadius(newRadius);
    if (onSafeZoneChange) {
      onSafeZoneChange(newRadius);
    }
  };

  return (
    <div className={cn("lookout-card overflow-hidden rounded-lg border border-border shadow-sm", className)}>
      {!hideZoneControls ? (
        <Tabs defaultValue="location" className="w-full" onValueChange={setActiveTab}>
          <div className="bg-white border-b border-border">
            <TabsList className="bg-transparent w-full grid grid-cols-2">
              <TabsTrigger value="location" className="data-[state=active]:bg-lookout-blue/10 text-xs md:text-sm">
                <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                {compactView ? "위치" : "위치 정보"}
              </TabsTrigger>
              <TabsTrigger value="controls" className="data-[state=active]:bg-lookout-blue/10 text-xs md:text-sm">
                <Shield className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                {compactView ? "구역" : "안전 구역"}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="location" className="m-0">
            <div ref={mapRef} className={`${compactView ? 'h-40' : 'h-64'} relative`}>
              {/* Map visualization using the uploaded image */}
              <img 
                src="/lovable-uploads/54136be6-54ef-4432-87ef-9c8a4637e04d.png" 
                alt="유정유치원 위치" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Child location indicator */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-5 h-5 md:w-6 md:h-6 bg-lookout-blue rounded-full flex items-center justify-center border-2 border-white animate-pulse-gentle">
                  <span className="text-[10px] md:text-xs text-white">👶</span>
                </div>
                <div className="w-16 h-16 md:w-24 md:h-24 bg-lookout-blue/20 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
              </div>
              
              {/* Safe area radius */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className={`border-2 border-dashed border-lookout-green/70 rounded-full`} style={{width: `${radius * (compactView ? 3 : 5)}px`, height: `${radius * (compactView ? 3 : 5)}px`}}></div>
              </div>

              {/* Map controls */}
              {showControls && (
                <div className="absolute top-2 right-2 flex flex-col gap-1 md:gap-2">
                  <Button size={compactView ? "icon-sm" : "icon"} variant="outline" className="bg-white shadow-sm">
                    <Compass className="h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                  <Button size={compactView ? "icon-sm" : "icon"} variant="outline" className="bg-white shadow-sm">
                    <Plus className="h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                  <Button size={compactView ? "icon-sm" : "icon"} variant="outline" className="bg-white shadow-sm">
                    <Minus className="h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                  <Button size={compactView ? "icon-sm" : "icon"} variant="outline" className="bg-white shadow-sm">
                    <Navigation className="h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                </div>
              )}
            </div>
            
            <div className={`${compactView ? 'p-2' : 'p-4'} bg-white`}>
              <h3 className="font-medium text-lookout-dark text-xs md:text-sm">현재 위치</h3>
              <p className="text-xs text-lookout-gray">경기 파주시 금바위로 35 유정유치원</p>
              
              <div className="flex items-center justify-between mt-2 md:mt-3 p-1 md:p-2 bg-lookout-blue/5 rounded-lg">
                <div>
                  <p className="text-[10px] md:text-xs text-lookout-gray">안전 반경</p>
                  <p className="text-xs md:text-sm font-medium text-lookout-dark">{radius}m</p>
                </div>
                <div className="h-8 border-r border-lookout-gray/20"></div>
                <div>
                  <p className="text-[10px] md:text-xs text-lookout-gray">마지막 업데이트</p>
                  <p className="text-xs md:text-sm font-medium text-lookout-dark">1분 전</p>
                </div>
                <div className="h-8 border-r border-lookout-gray/20"></div>
                <div>
                  <p className="text-[10px] md:text-xs text-lookout-gray">배터리</p>
                  <p className="text-xs md:text-sm font-medium text-lookout-dark">85%</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="controls" className="m-0">
            <div className={`${compactView ? 'p-2' : 'p-4'} bg-white`}>
              <h3 className="font-medium text-lookout-dark mb-1 md:mb-2 text-xs md:text-sm">안전 구역 설정</h3>
              <p className="text-xs text-lookout-gray mb-2 md:mb-4">아이가 안전하게 이동할 수 있는 범위를 설정하세요.</p>
              
              {/* Safe zone adjustment slider */}
              <div className="space-y-2 md:space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-1 md:mb-2">
                    <label className="text-xs font-medium text-lookout-dark">안전 반경 조정</label>
                    <span className="text-xs font-medium bg-lookout-blue/10 text-lookout-blue px-2 py-0.5 rounded-full">{radius}m</span>
                  </div>
                  <Slider 
                    value={[radius]} 
                    min={10} 
                    max={100} 
                    step={5}
                    onValueChange={handleRadiusChange} 
                    className="flex-1" 
                  />
                  <div className="flex justify-between text-[10px] md:text-xs text-lookout-gray mt-1">
                    <span>10m</span>
                    <span>50m</span>
                    <span>100m</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-xs font-medium text-lookout-dark mb-1 md:mb-2 block">알림 설정</label>
                  <div className="grid grid-cols-2 gap-1 md:gap-2">
                    <Button size={compactView ? "sm" : "default"} variant="outline" className="justify-start border-lookout-blue/20 bg-lookout-blue/5 text-lookout-dark text-xs md:text-sm">
                      <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-lookout-blue mr-1 md:mr-2"></div>
                      구역 이탈 알림
                    </Button>
                    <Button size={compactView ? "sm" : "default"} variant="outline" className="justify-start border-lookout-blue/20 text-lookout-dark text-xs md:text-sm">
                      <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-lookout-gray mr-1 md:mr-2"></div>
                      이상 행동 알림
                    </Button>
                  </div>
                </div>

                <Button size={compactView ? "sm" : "default"} className="w-full lookout-button bg-lookout-blue text-white text-xs md:text-sm">
                  <Target className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                  안전 구역 저장하기
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        // Simplified version for home page without zone controls
        <div>
          <div ref={mapRef} className={`${compactView ? 'h-40' : 'h-64'} relative`}>
            {/* Map visualization using the uploaded image */}
            <img 
              src="/lovable-uploads/54136be6-54ef-4432-87ef-9c8a4637e04d.png"
              alt="유정유치원 위치" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Child location indicator */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-5 h-5 md:w-6 md:h-6 bg-lookout-blue rounded-full flex items-center justify-center border-2 border-white animate-pulse-gentle">
                <span className="text-[10px] md:text-xs text-white">👶</span>
              </div>
              <div className="w-16 h-16 md:w-24 md:h-24 bg-lookout-blue/20 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
            </div>
            
            {/* Safe area radius */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className={`border-2 border-dashed border-lookout-green/70 rounded-full`} style={{width: `${radius * (compactView ? 3 : 5)}px`, height: `${radius * (compactView ? 3 : 5)}px`}}></div>
            </div>

            {/* Map controls */}
            {showControls && (
              <div className="absolute top-2 right-2 flex flex-col gap-1 md:gap-2">
                <Button size={compactView ? "icon-sm" : "icon"} variant="outline" className="bg-white shadow-sm">
                  <Compass className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
                <Button size={compactView ? "icon-sm" : "icon"} variant="outline" className="bg-white shadow-sm">
                  <Plus className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
                <Button size={compactView ? "icon-sm" : "icon"} variant="outline" className="bg-white shadow-sm">
                  <Minus className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
                <Button size={compactView ? "icon-sm" : "icon"} variant="outline" className="bg-white shadow-sm">
                  <Navigation className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
              </div>
            )}
          </div>
          
          <div className={`${compactView ? 'p-2' : 'p-4'} bg-white`}>
            <h3 className="font-medium text-lookout-dark text-xs md:text-sm">현재 위치</h3>
            <p className="text-xs text-lookout-gray">경기 파주시 금바위로 35 유정유치원</p>
            
            <div className="flex items-center justify-between mt-2 md:mt-3 p-1 md:p-2 bg-lookout-blue/5 rounded-lg">
              <div>
                <p className="text-[10px] md:text-xs text-lookout-gray">안전 반경</p>
                <p className="text-xs md:text-sm font-medium text-lookout-dark">{radius}m</p>
              </div>
              <div className="h-8 border-r border-lookout-gray/20"></div>
              <div>
                <p className="text-[10px] md:text-xs text-lookout-gray">마지막 업데이트</p>
                <p className="text-xs md:text-sm font-medium text-lookout-dark">1분 전</p>
              </div>
              <div className="h-8 border-r border-lookout-gray/20"></div>
              <div>
                <p className="text-[10px] md:text-xs text-lookout-gray">배터리</p>
                <p className="text-xs md:text-sm font-medium text-lookout-dark">85%</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
