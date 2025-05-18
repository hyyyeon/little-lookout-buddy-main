
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Bell, MapPin, Battery, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AlertItem {
  id: string;
  type: "boundary" | "distance" | "movement" | "battery";
  message: string;
  time: string;
  read: boolean;
  childName?: string;
  location?: string;
}

const alertsData: AlertItem[] = [
  {
    id: "1",
    type: "boundary",
    message: "민서가 안전 구역을 벗어났습니다.",
    time: "10분 전",
    read: false,
    childName: "민서",
    location: "서울특별시 강남구 선릉로 12번길",
  },
  {
    id: "2",
    type: "movement",
    message: "민서가 빠르게 이동하고 있습니다.",
    time: "30분 전",
    read: true,
    childName: "민서",
    location: "서울특별시 강남구 대치동 937",
  },
  {
    id: "3",
    type: "battery",
    message: "민서의 기기 배터리가 20% 남았습니다.",
    time: "1시간 전",
    read: true,
    childName: "민서",
  },
  {
    id: "4",
    type: "boundary",
    message: "민서가 유치원에 도착했습니다.",
    time: "오전 9:00",
    read: true,
    childName: "민서",
    location: "서울특별시 강남구 싸피 유치원",
  },
];

const getAlertIcon = (type: string) => {
  switch(type) {
    case "boundary": return <MapPin className="h-5 w-5 text-lookout-coral" />;
    case "distance": return <MapPin className="h-5 w-5 text-lookout-yellow" />;
    case "movement": return <AlertTriangle className="h-5 w-5 text-lookout-yellow" />;
    case "battery": return <Battery className="h-5 w-5 text-lookout-teal" />;
    default: return <Bell className="h-5 w-5" />;
  }
};

const getAlertColor = (type: string) => {
  switch(type) {
    case "boundary": return "bg-lookout-coral/10 border-lookout-coral/20";
    case "distance": return "bg-lookout-yellow/10 border-lookout-yellow/20";
    case "movement": return "bg-lookout-yellow/10 border-lookout-yellow/20";
    case "battery": return "bg-lookout-teal/10 border-lookout-teal/20";
    default: return "bg-muted";
  }
};

const AlertsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  
  const filteredAlerts = activeTab === "all" 
    ? alertsData 
    : alertsData.filter(alert => alert.type === activeTab);

  const unreadCount = alertsData.filter(alert => !alert.read).length;

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-lookout-dark flex items-center gap-2">
          알림
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unreadCount} 개 새 알림
            </Badge>
          )}
        </h1>
        <p className="text-lookout-gray">아이의 안전 상태와 관련된 알림을 확인하세요.</p>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="boundary">안전구역</TabsTrigger>
          <TabsTrigger value="distance">거리</TabsTrigger>
          <TabsTrigger value="movement">이동</TabsTrigger>
          <TabsTrigger value="battery">배터리</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="space-y-4">
          {filteredAlerts.length === 0 ? (
            <div className="text-center p-8">
              <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">알림이 없습니다</h3>
              <p className="text-muted-foreground">이 카테고리에 해당하는 알림이 없습니다.</p>
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <Alert 
                key={alert.id} 
                className={cn(
                  "flex items-start gap-4", 
                  getAlertColor(alert.type),
                  !alert.read && "bg-lookout-blue/5 border-lookout-blue/20"
                )}
              >
                <div className="mt-1">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1">
                  <AlertTitle className="text-lookout-dark">{alert.message}</AlertTitle>
                  <AlertDescription className="text-lookout-gray flex flex-col gap-1 mt-1">
                    <div className="flex items-center justify-between">
                      <span>{alert.time}</span>
                      {alert.location && (
                        <span className="text-xs flex items-center">
                          <MapPin className="h-3 w-3 mr-1" /> {alert.location}
                        </span>
                      )}
                    </div>
                    {!alert.read && (
                      <div className="mt-2 flex justify-end gap-2">
                        <Button variant="outline" size="sm">지도에서 보기</Button>
                        <Button size="sm">확인</Button>
                      </div>
                    )}
                  </AlertDescription>
                </div>
              </Alert>
            ))
          )}
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default AlertsPage;
