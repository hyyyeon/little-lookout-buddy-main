
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Plus, Edit, Trash2, Users } from "lucide-react";
import childImage from "/lovable-uploads/75dbe2b1-9f36-49ee-bdfc-19a30ded3919.png";

interface Profile {
  id: string;
  name: string;
  age: number;
  imageUrl: string;
  type: "child" | "guardian";
  role?: string;
  status?: "active" | "pending" | "inactive";
  lastActive?: string;
}

const profilesData: Profile[] = [
  {
    id: "1",
    name: "민서",
    age: 5,
    imageUrl: childImage,
    type: "child"
  },
  {
    id: "2",
    name: "어머니",
    age: 35,
    imageUrl: "/placeholder.svg",
    type: "guardian",
    role: "주 보호자",
    status: "active",
    lastActive: "방금 전"
  },
  {
    id: "3",
    name: "아버지",
    age: 37,
    imageUrl: "/placeholder.svg",
    type: "guardian",
    role: "보조 보호자",
    status: "active",
    lastActive: "1시간 전"
  },
  {
    id: "4",
    name: "할머니",
    age: 65,
    imageUrl: "/placeholder.svg",
    type: "guardian",
    role: "보조 보호자",
    status: "pending",
    lastActive: "초대됨"
  }
];

const ProfilesPage = () => {
  const [activeTab, setActiveTab] = useState("children");
  
  const children = profilesData.filter(profile => profile.type === "child");
  const guardians = profilesData.filter(profile => profile.type === "guardian");

  const getStatusBadge = (status?: string) => {
    if (!status) return null;
    
    switch (status) {
      case "active":
        return <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">활성</span>;
      case "pending":
        return <span className="inline-block bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full">대기중</span>;
      case "inactive":
        return <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full">비활성</span>;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-lookout-dark">프로필 관리</h1>
            <p className="text-lookout-gray">아이와 보호자의 프로필을 관리하세요</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="children" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-2 mb-6">
          <TabsTrigger value="children">
            <User className="h-4 w-4 mr-2" />
            아이 프로필
          </TabsTrigger>
          <TabsTrigger value="guardians">
            <Users className="h-4 w-4 mr-2" />
            보호자 관리
          </TabsTrigger>
        </TabsList>

        <TabsContent value="children" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Button className="bg-lookout-blue text-white">
              <Plus className="h-4 w-4 mr-2" />
              아이 추가하기
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {children.map((child) => (
              <div key={child.id} className="bg-white rounded-lg shadow-sm border border-border p-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img
                      src={child.imageUrl}
                      alt={`${child.name}의 프로필 사진`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg text-lookout-dark">{child.name}</h3>
                        <p className="text-sm text-lookout-gray">{child.age}세</p>
                      </div>
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-lookout-blue hover:bg-lookout-blue/10">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-lookout-coral hover:bg-lookout-coral/10">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Button className="w-full bg-lookout-blue text-white">
                    <User className="h-4 w-4 mr-2" />
                    프로필 관리
                  </Button>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs text-lookout-gray">태그 장치 연결: BLE-XM450C</p>
                  <p className="text-xs text-lookout-gray">마지막 활동: 1분 전</p>
                </div>
              </div>
            ))}
            
            {/* Add child card */}
            <div className="bg-lookout-blue/5 rounded-lg border border-dashed border-lookout-blue/30 p-4 flex flex-col items-center justify-center h-full min-h-[200px]">
              <Plus className="h-12 w-12 text-lookout-blue/40 mb-2" />
              <p className="text-lookout-blue/70 font-medium">새 아이 추가하기</p>
              <p className="text-xs text-lookout-gray text-center mt-2">
                아이를 추가하여 안전하게<br />위치를 추적하세요
              </p>
              <Button variant="outline" className="mt-4 border-lookout-blue/20">
                아이 추가
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="guardians" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Button className="bg-lookout-blue text-white">
              <Plus className="h-4 w-4 mr-2" />
              보호자 초대하기
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-lookout-blue/5 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-lookout-dark uppercase tracking-wider">
                      보호자
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-lookout-dark uppercase tracking-wider">
                      역할
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-lookout-dark uppercase tracking-wider">
                      상태
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-lookout-dark uppercase tracking-wider">
                      마지막 활동
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-lookout-dark uppercase tracking-wider">
                      관리
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {guardians.map((guardian) => (
                    <tr key={guardian.id} className="hover:bg-lookout-beige/20">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img
                              src={guardian.imageUrl}
                              alt={`${guardian.name}의 프로필 사진`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <p className="font-medium text-lookout-dark">{guardian.name}</p>
                            <p className="text-xs text-lookout-gray">{guardian.age}세</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm text-lookout-dark">{guardian.role}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(guardian.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm text-lookout-dark">{guardian.lastActive}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <Button size="sm" variant="ghost" className="text-lookout-blue hover:bg-lookout-blue/10 h-8">
                          <Edit className="h-4 w-4 mr-1" />
                          권한 설정
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default ProfilesPage;
