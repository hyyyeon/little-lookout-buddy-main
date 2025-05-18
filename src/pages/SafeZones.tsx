
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { NaverMap } from "@/components/dashboard/NaverMap";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, Home, School, Clock, Edit, Trash, Target, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/components/ui/use-toast";

// Define the risk level as a union type
type RiskLevel = "normal" | "high";

interface BaseZone {
  id: string;
  name: string;
  address: string;
  radius: number;
  schedule?: {
    days: string[];
    startTime: string;
    endTime: string;
  };
}

interface SafeZone extends BaseZone {
  type: "home" | "school" | "playground" | "custom";
  zoneType: "safe";
}

interface RiskZone extends BaseZone {
  riskLevel: RiskLevel;
  zoneType: "risk";
}

type Zone = SafeZone | RiskZone;

const safeZonesData: SafeZone[] = [
  {
    id: "1",
    name: "우리집",
    address: "경기도 파주시 가온로 256",
    radius: 20,
    type: "home",
    zoneType: "safe"
  },
  {
    id: "2",
    name: "유정유치원",
    address: "경기 파주시 금바위로 35",
    radius: 50,
    schedule: {
      days: ["월", "화", "수", "목", "금"],
      startTime: "09:00",
      endTime: "17:00"
    },
    type: "school",
    zoneType: "safe"
  }
];

const riskZonesData: RiskZone[] = [
  {
    id: "1",
    name: "사거리 공사장",
    address: "서울특별시 강남구 역삼동 대로변",
    radius: 100,
    riskLevel: "high",
    zoneType: "risk",
    schedule: {
      days: ["월", "화", "수", "목", "금", "토", "일"],
      startTime: "18:00",
      endTime: "08:00"
    }
  },
  {
    id: "2",
    name: "상가 밀집 지역",
    address: "서울특별시 강남구 테헤란로",
    radius: 70,
    riskLevel: "normal",
    zoneType: "risk"
  }
];

const getZoneIcon = (zone: Zone) => {
  if (zone.zoneType === "safe") {
    switch((zone as SafeZone).type) {
      case "home": return <Home className="h-5 w-5" />;
      case "school": return <School className="h-5 w-5" />;
      default: return <Target className="h-5 w-5" />;
    }
  } else {
    return <AlertTriangle className={cn(
      "h-5 w-5",
      (zone as RiskZone).riskLevel === "high" ? "text-red-500" : "text-orange-500"
    )} />;
  }
};

const SafeZonesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("safe");
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  
  const [newSafezone, setNewSafezone] = useState({
    name: "",
    address: "",
    type: "custom" as const,
    radius: 20,
    days: [] as string[],
    startTime: "",
    endTime: ""
  });
  
  const [newRiskzone, setNewRiskzone] = useState({
    name: "",
    address: "",
    radius: 50,
    riskLevel: "normal" as RiskLevel,
    days: [] as string[],
    startTime: "",
    endTime: ""
  });

  const handleSave = () => {
    toast({
      title: "저장 완료",
      description: "구역 정보가 저장되었습니다.",
    });
    
    setSelectedZone(null);
    setIsAddingNew(false);
  };

  const handleDelete = (id: string) => {
    toast({
      title: "삭제 완료",
      description: "구역이 삭제되었습니다.",
      variant: "destructive",
    });
  };

  const toggleDay = (day: string) => {
    if (activeTab === "safe") {
      const days = [...newSafezone.days];
      if (days.includes(day)) {
        setNewSafezone({...newSafezone, days: days.filter(d => d !== day)});
      } else {
        setNewSafezone({...newSafezone, days: [...days, day]});
      }
    } else {
      const days = [...newRiskzone.days];
      if (days.includes(day)) {
        setNewRiskzone({...newRiskzone, days: days.filter(d => d !== day)});
      } else {
        setNewRiskzone({...newRiskzone, days: [...days, day]});
      }
    }
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-lookout-dark">구역 설정</h1>
        <p className="text-lookout-gray">아이를 위한 안전 구역과 위험 구역을 관리하세요.</p>
      </div>

      <Tabs defaultValue="safe" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="safe">안전 구역</TabsTrigger>
          <TabsTrigger value="risk">위험 구역</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <NaverMap 
            className="mb-4" 
            safeZoneRadius={selectedZone?.radius || 15}
            childLocation={{ lat: 37.7247, lng: 126.7327 }} 
          />
          
          {isAddingNew && activeTab === "safe" && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>새 안전 구역 추가</CardTitle>
                <CardDescription>아이가 머물러도 안전한 구역을 설정하세요.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">구역 이름</label>
                  <Input 
                    placeholder="집, 유치원 등" 
                    value={newSafezone.name}
                    onChange={(e) => setNewSafezone({...newSafezone, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">주소</label>
                  <Input 
                    placeholder="주소 검색" 
                    value={newSafezone.address}
                    onChange={(e) => setNewSafezone({...newSafezone, address: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">구역 유형</label>
                  <div className="flex gap-2">
                    {[
                      {value: "home", label: "집", icon: <Home className="h-4 w-4" />},
                      {value: "school", label: "학교", icon: <School className="h-4 w-4" />},
                      {value: "playground", label: "놀이터", icon: <MapPin className="h-4 w-4" />},
                      {value: "custom", label: "기타", icon: <Target className="h-4 w-4" />}
                    ].map(type => (
                      <Button
                        key={type.value}
                        type="button"
                        variant={newSafezone.type === type.value ? "default" : "outline"}
                        className="flex-1"
                        onClick={() => setNewSafezone({...newSafezone, type: type.value as any})}
                      >
                        {type.icon}
                        {type.label}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">안전 반경 (미터)</label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[newSafezone.radius]}
                      min={10}
                      max={500}
                      step={10}
                      onValueChange={(val) => setNewSafezone({...newSafezone, radius: val[0]})}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium w-16 text-right">
                      {newSafezone.radius}m
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">일정 설정 (선택사항)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input 
                      type="time" 
                      placeholder="시작 시간"
                      value={newSafezone.startTime}
                      onChange={(e) => setNewSafezone({...newSafezone, startTime: e.target.value})}
                    />
                    <Input 
                      type="time" 
                      placeholder="종료 시간"
                      value={newSafezone.endTime}
                      onChange={(e) => setNewSafezone({...newSafezone, endTime: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["월", "화", "수", "목", "금", "토", "일"].map((day) => (
                      <Button
                        key={day}
                        type="button"
                        variant="outline"
                        className={cn(
                          "flex-1",
                          newSafezone.days.includes(day) && "bg-primary text-primary-foreground"
                        )}
                        onClick={() => toggleDay(day)}
                      >
                        {day}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => {
                  setIsAddingNew(false);
                }}>
                  취소
                </Button>
                <Button onClick={handleSave}>저장하기</Button>
              </CardFooter>
            </Card>
          )}
          
          {isAddingNew && activeTab === "risk" && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>새 위험 구역 추가</CardTitle>
                <CardDescription>아이가 접근하면 위험한 구역을 설정하세요.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">구역 이름</label>
                  <Input 
                    placeholder="공사장, 사거리 등" 
                    value={newRiskzone.name}
                    onChange={(e) => setNewRiskzone({...newRiskzone, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">주소</label>
                  <Input 
                    placeholder="주소 검색" 
                    value={newRiskzone.address}
                    onChange={(e) => setNewRiskzone({...newRiskzone, address: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">위험 반경 (미터)</label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[newRiskzone.radius]}
                      min={10}
                      max={500}
                      step={10}
                      onValueChange={(val) => setNewRiskzone({...newRiskzone, radius: val[0]})}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium w-16 text-right">
                      {newRiskzone.radius}m
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">위험 등급</label>
                  <div className="flex gap-3">
                    <Button 
                      type="button" 
                      variant={newRiskzone.riskLevel === 'normal' ? "default" : "outline"}
                      className={cn(
                        "flex-1",
                        newRiskzone.riskLevel === 'normal' ? "bg-orange-500" : ""
                      )}
                      onClick={() => setNewRiskzone({...newRiskzone, riskLevel: 'normal'})}
                    >
                      <div className="w-3 h-3 rounded-full bg-orange-400 mr-2"></div>
                      일반 위험
                    </Button>
                    <Button 
                      type="button" 
                      variant={newRiskzone.riskLevel === 'high' ? "default" : "outline"}
                      className={cn(
                        "flex-1",
                        newRiskzone.riskLevel === 'high' ? "bg-red-500" : ""
                      )}
                      onClick={() => setNewRiskzone({...newRiskzone, riskLevel: 'high'})}
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
                      value={newRiskzone.startTime}
                      onChange={(e) => setNewRiskzone({...newRiskzone, startTime: e.target.value})}
                    />
                    <Input 
                      type="time" 
                      placeholder="종료 시간"
                      value={newRiskzone.endTime}
                      onChange={(e) => setNewRiskzone({...newRiskzone, endTime: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["월", "화", "수", "목", "금", "토", "일"].map((day) => (
                      <Button
                        key={day}
                        type="button"
                        variant="outline"
                        className={cn(
                          "flex-1",
                          newRiskzone.days.includes(day) && "bg-primary text-primary-foreground"
                        )}
                        onClick={() => toggleDay(day)}
                      >
                        {day}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => {
                  setIsAddingNew(false);
                }}>
                  취소
                </Button>
                <Button onClick={handleSave}>저장하기</Button>
              </CardFooter>
            </Card>
          )}

          {selectedZone && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>구역 편집</CardTitle>
                <CardDescription>
                  {selectedZone.zoneType === "safe" 
                    ? "안전 구역 정보를 수정합니다." 
                    : "위험 구역 정보를 수정합니다."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* 편집 폼 내용 */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">구역 이름</label>
                  <Input defaultValue={selectedZone.name} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">주소</label>
                  <Input defaultValue={selectedZone.address} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">반경 (미터)</label>
                  <div className="flex items-center gap-4">
                    <Slider
                      defaultValue={[selectedZone.radius]}
                      min={10}
                      max={500}
                      step={10}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium w-16 text-right">
                      {selectedZone.radius}m
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setSelectedZone(null)}>
                  취소
                </Button>
                <Button onClick={handleSave}>저장하기</Button>
              </CardFooter>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">
              {activeTab === "safe" ? "안전 구역 목록" : "위험 구역 목록"}
            </h2>
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
            {activeTab === "safe" ? (
              safeZonesData.map(zone => (
                <Card key={zone.id} className={cn(
                  "transition-all",
                  selectedZone?.id === zone.id ? "border-primary" : ""
                )}>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-lookout-blue/10 flex items-center justify-center">
                          {getZoneIcon(zone)}
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
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-7 w-7 text-destructive"
                          onClick={() => handleDelete(zone.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-lookout-gray mb-2">{zone.address}</p>
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
              ))
            ) : (
              riskZonesData.map(zone => (
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
                          {getZoneIcon(zone)}
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
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-7 w-7 text-destructive"
                          onClick={() => handleDelete(zone.id)}
                        >
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
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SafeZonesPage;
