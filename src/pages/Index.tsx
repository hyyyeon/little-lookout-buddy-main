import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ChildProfileCard } from "@/components/dashboard/ChildProfileCard";
import { SafetyStatusCard } from "@/components/dashboard/SafetyStatusCard";
import { NaverMap } from "@/components/dashboard/NaverMap";
import { RecentAlerts } from "@/components/dashboard/RecentAlerts";
import { Bell, MapPin } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Sample data for demo
const childData = {
  id: "1",
  name: "민서",
  age: 5,
  imageUrl: "/lovable-uploads/75dbe2b1-9f36-49ee-bdfc-19a30ded3919.png",
  status: "safe" as const,
  lastLocation: "경기 파주시 금바위로 35 유정유치원",
  distance: 8,
};

const alertsData = [
  {
    id: "1",
    type: "place" as const,
    category: "장소" as const,
    message: "민서가 유치원에 도착했습니다.",
    time: "5분 전",
    read: false,
  },
  {
    id: "2",
    type: "activity" as const,
    category: "이동" as const,
    message: "민서가 평소보다 빠르게 이동 중입니다. (1.5km/h 초과)",
    time: "15분 전",
    read: true,
  },
  {
    id: "3",
    type: "device" as const,
    category: "기기" as const,
    message: "민서의 스마트워치 배터리가 15% 남았습니다.",
    time: "30분 전",
    read: false,
  },
  {
    id: "4",
    type: "place" as const,
    category: "장소" as const,
    message: "민서가 지정된 안전 구역을 벗어났습니다.",
    time: "1시간 전",
    read: true,
  },
  {
    id: "5",
    type: "activity" as const,
    category: "이동" as const,
    message: "민서가 한 장소에 30분 이상 머무르고 있습니다.",
    time: "2시간 전",
    read: false,
  },
  {
    id: "6",
    type: "all" as const,
    category: "전체" as const,
    message: "[공지] 주말 서비스 안정화 작업 안내",
    time: "1일 전",
    read: true,
  },
];

const historyData = [
  {
    id: "1",
    icon: "🏫",
    iconBg: "bg-lookout-teal/20",
    title: "유정유치원 도착",
    time: "오전 9:15",
    location: "유정유치원"
  },
  {
    id: "2",
    icon: "🚶‍♂️",
    iconBg: "bg-lookout-yellow/20",
    title: "등원 시작",
    time: "오전 8:50",
    location: "자택"
  },
];

const Index = () => {
  const [safeZoneRadius, setSafeZoneRadius] = useState(15);
  const isMobile = useIsMobile();

  const handleRadiusChange = (radius: number) => {
    setSafeZoneRadius(radius);
  };

  return (
    <Layout noPadding={isMobile}>
      <div className={isMobile ? "px-2 py-2" : "mb-6"}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-lookout-dark">안녕하세요, 보호자님!</h1>
            <p className="text-sm md:text-base text-lookout-gray">민서가 안전한 상태입니다.</p>
          </div>
          <div className="flex space-x-2 mt-2 md:mt-0">
            {!isMobile && (
              <Button variant="outline" className="text-lookout-blue border-lookout-blue/30">
                <Bell className="h-4 w-4 mr-2" />
                알림 설정
              </Button>
            )}
            <Button className="text-xs md:text-sm bg-gradient-to-r from-lookout-blue to-lookout-teal text-white">
              <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
              현재 위치
            </Button>
          </div>
        </div>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-3 gap-2 ${isMobile ? "px-2" : "gap-6"}`}>
        <div className="md:col-span-2">
          <div className="space-y-2 md:space-y-6">
            {!isMobile && <SafetyStatusCard status={childData.status} />}
            <NaverMap 
              safeZoneRadius={safeZoneRadius} 
              onSafeZoneChange={(radius) => handleRadiusChange(radius)}
              compactView={isMobile}
              hideZoneControls={true}
            />
          </div>
        </div>

        <div className="space-y-2 md:space-y-6">
          <ChildProfileCard child={childData} />
          <RecentAlerts alerts={alertsData} />
        </div>
      </div>

      {!isMobile && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-lookout-dark">활동 히스토리</h2>
            <Button variant="ghost" className="text-lookout-blue text-sm">
              전체 보기
            </Button>
          </div>
          <div className="space-y-3">
            {historyData.map((item) => (
              <div key={item.id} className="lookout-card p-4 bg-white shadow-sm border border-border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${item.iconBg} rounded-full flex items-center justify-center`}>
                      <span>{item.icon}</span>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-medium text-lookout-dark">{item.title}</h4>
                        <span className="ml-2 text-xs bg-lookout-beige/50 text-lookout-dark px-2 py-0.5 rounded-full">
                          {item.location}
                        </span>
                      </div>
                      <p className="text-xs text-lookout-gray">{item.time}</p>
                    </div>
                  </div>
                  <Button variant="ghost" className="text-lookout-blue text-sm hover:bg-lookout-blue/10 h-8">
                    자세히
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Index;
