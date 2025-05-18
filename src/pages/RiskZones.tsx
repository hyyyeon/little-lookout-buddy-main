
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, AlertTriangle, Clock, Edit, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { KakaoMap, RiskZone } from "@/components/dashboard/KakaoMap";

// Sample data for risk zones
const riskZonesData: RiskZone[] = [
  {
    id: "1",
    name: "사거리 공사장",
    location: { lat: 37.566, lng: 126.978 },
    radius: 100,
    riskLevel: "high",
    schedule: {
      startTime: "18:00",
      endTime: "08:00"
    }
  },
  {
    id: "2",
    name: "상가 밀집 지역",
    location: { lat: 37.568, lng: 126.977 },
    radius: 70,
    riskLevel: "normal"
  },
  {
    id: "3",
    name: "유흥가",
    location: { lat: 37.564, lng: 126.979 },
    radius: 120,
    riskLevel: "high",
    schedule: {
      startTime: "20:00",
      endTime: "06:00"
    }
  }
];

const RiskZonesPage: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<RiskZone | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newZoneName, setNewZoneName] = useState("");
  const [newZoneRadius, setNewZoneRadius] = useState(100);
  const [newZoneRiskLevel, setNewZoneRiskLevel] = useState<'normal' | 'high'>('normal');
  const [newZoneStartTime, setNewZoneStartTime] = useState("");
  const [newZoneEndTime, setNewZoneEndTime] = useState("");

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-lookout-dark">위험 구역 관리</h1>
        <p className="text-lookout-gray">아이가 접근하면 위험한 구역을 설정하고 관리하세요.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <KakaoMap 
            className="mb-4"
            safeZoneRadius={15}
            riskZones={riskZonesData}
          />
          
          {(selectedZone || isAddingNew) && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{isAddingNew ? "새 위험 구역 추가" : "위험 구역 편집"}</CardTitle>
                <CardDescription>아이가 접근하면 위험한 구역을 설정하세요.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">구역 이름</label>
                  <Input 
                    placeholder="공사장, 사거리 등" 
                    value={isAddingNew ? newZoneName : selectedZone?.name}
                    onChange={(e) => isAddingNew ? setNewZoneName(e.target.value) : null}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">위치 설정</label>
                  <p className="text-xs text-lookout-gray">지도에서 위치를 선택하세요.</p>
                  <div className="h-32 bg-lookout-teal/10 flex items-center justify-center rounded border border-border">
                    <p className="text-sm text-lookout-gray">지도에서 위치 선택</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">위험 반경 (미터)</label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[isAddingNew ? newZoneRadius : selectedZone?.radius || 100]}
                      min={10}
                      max={500}
                      step={10}
                      onValueChange={(val) => isAddingNew ? setNewZoneRadius(val[0]) : null}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium w-16 text-right">
                      {isAddingNew ? newZoneRadius : selectedZone?.radius}m
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">위험 등급</label>
                  <div className="flex gap-3">
                    <Button 
                      type="button" 
                      variant={newZoneRiskLevel === 'normal' ? "default" : "outline"}
                      className={cn(
                        "flex-1",
                        newZoneRiskLevel === 'normal' ? "bg-orange-500" : ""
                      )}
                      onClick={() => isAddingNew ? setNewZoneRiskLevel('normal') : null}
                    >
                      <div className="w-3 h-3 rounded-full bg-orange-400 mr-2"></div>
                      일반 위험
                    </Button>
                    <Button 
                      type="button" 
                      variant={newZoneRiskLevel === 'high' ? "default" : "outline"}
                      className={cn(
                        "flex-1",
                        newZoneRiskLevel === 'high' ? "bg-red-500" : ""
                      )}
                      onClick={() => isAddingNew ? setNewZoneRiskLevel('high') : null}
                    >
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      고위험
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">시간대 설정 (선택사항)</label>
                  <p className="text-xs text-lookout-gray">특정 시간에만 위험 구역으로 지정하려면 설정하세요.</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Input 
                      type="time" 
                      placeholder="시작 시간"
                      value={isAddingNew ? newZoneStartTime : selectedZone?.schedule?.startTime || ""}
                      onChange={(e) => isAddingNew ? setNewZoneStartTime(e.target.value) : null}
                    />
                    <Input 
                      type="time" 
                      placeholder="종료 시간"
                      value={isAddingNew ? newZoneEndTime : selectedZone?.schedule?.endTime || ""}
                      onChange={(e) => isAddingNew ? setNewZoneEndTime(e.target.value) : null}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => {
                  setSelectedZone(null);
                  setIsAddingNew(false);
                }}>
                  취소
                </Button>
                <Button>저장하기</Button>
              </CardFooter>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">위험 구역 목록</h2>
            <Button 
              size="sm"
              onClick={() => {
                setSelectedZone(null);
                setIsAddingNew(true);
              }}
              disabled={isAddingNew}
            >
              추가하기
            </Button>
          </div>
          
          <div className="space-y-3">
            {riskZonesData.map(zone => (
              <Card key={zone.id} className={cn(
                "transition-all",
                selectedZone?.id === zone.id ? "border-primary" : ""
              )}>
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center",
                        zone.riskLevel === 'high' ? "bg-red-100" : "bg-orange-100"
                      )}>
                        <AlertTriangle className={cn(
                          "h-5 w-5",
                          zone.riskLevel === 'high' ? "text-red-500" : "text-orange-500"
                        )} />
                      </div>
                      <CardTitle className="text-base">{zone.name}</CardTitle>
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-7 w-7"
                        onClick={() => setSelectedZone(zone)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-lookout-gray mb-2">
                    {zone.riskLevel === 'high' ? '고위험' : '일반 위험'} 구역
                  </p>
                  <div className="flex justify-between text-xs">
                    <span className="text-lookout-dark">반경 {zone.radius}m</span>
                    {zone.schedule && (
                      <span className="flex items-center text-lookout-dark">
                        <Clock className="h-3 w-3 mr-1" />
                        {zone.schedule.startTime}-{zone.schedule.endTime}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RiskZonesPage;
