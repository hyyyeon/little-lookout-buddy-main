
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { NaverMap } from "@/components/dashboard/NaverMap";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, BellRing } from "lucide-react";

const SettingsPage: React.FC = () => {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-lookout-dark">설정</h1>
        <p className="text-lookout-gray">앱 설정을 관리하세요</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">일반</TabsTrigger>
          <TabsTrigger value="notifications">알림</TabsTrigger>
          <TabsTrigger value="location">위치</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>일반 설정</CardTitle>
              <CardDescription>앱의 기본 설정을 관리합니다</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dark-mode">다크 모드</Label>
                  <p className="text-sm text-lookout-gray">어두운 테마로 전환합니다</p>
                </div>
                <Switch id="dark-mode" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="language">언어</Label>
                  <p className="text-sm text-lookout-gray">앱 언어를 선택합니다</p>
                </div>
                <select className="border rounded p-2">
                  <option>한국어</option>
                  <option>English</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>알림 설정</CardTitle>
              <CardDescription>알림 수신 방식을 설정합니다</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BellRing className="h-5 w-5" />
                  <div>
                    <Label htmlFor="safety-alerts">안전 알림</Label>
                    <p className="text-sm text-lookout-gray">아이가 안전구역을 벗어날 때 알림을 받습니다</p>
                  </div>
                </div>
                <Switch id="safety-alerts" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  <div>
                    <Label htmlFor="activity-alerts">활동 알림</Label>
                    <p className="text-sm text-lookout-gray">아이의 중요 활동에 대해 알림을 받습니다</p>
                  </div>
                </div>
                <Switch id="activity-alerts" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="location" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>위치 설정</CardTitle>
              <CardDescription>위치 추적 설정을 관리합니다</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <NaverMap className="mb-4" />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="tracking-interval">위치 추적 간격</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      id="tracking-interval" 
                      type="number" 
                      className="w-20" 
                      defaultValue="5" 
                    />
                    <span>분</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="background-tracking">백그라운드 추적</Label>
                  <Switch id="background-tracking" defaultChecked />
                </div>
                
                <Button className="w-full">위치 데이터 초기화</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default SettingsPage;
