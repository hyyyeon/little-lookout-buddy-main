
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart2, Clock, AlertTriangle, ShieldAlert, ArrowUpRight } from "lucide-react";

const AIReportsPage = () => {
  return (
    <Layout>
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-lookout-dark">AI 분석 리포트</h1>
            <p className="text-lookout-gray">인공지능이 분석한 아이의 활동 패턴과 안전 분석 결과입니다</p>
          </div>
          <Button className="mt-4 md:mt-0 bg-gradient-to-r from-lookout-blue to-lookout-teal text-white">
            <BarChart2 className="h-4 w-4 mr-2" />
            분석 리포트 업데이트
          </Button>
        </div>
      </div>

      <Tabs defaultValue="safety" className="w-full mb-6">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="safety">
            <ShieldAlert className="h-4 w-4 mr-2" />
            안전도 분석
          </TabsTrigger>
          <TabsTrigger value="patterns">
            <Clock className="h-4 w-4 mr-2" />
            이동 패턴
          </TabsTrigger>
          <TabsTrigger value="anomalies">
            <AlertTriangle className="h-4 w-4 mr-2" />
            이상 행동 감지
          </TabsTrigger>
        </TabsList>

        <TabsContent value="safety" className="mt-4">
          <div className="bg-white rounded-lg shadow-sm border border-border p-6">
            <h3 className="text-lg font-semibold text-lookout-dark mb-4">안전도 점수</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-lookout-blue/10 rounded-lg p-4 text-center">
                <h4 className="text-sm font-medium text-lookout-gray mb-2">종합 안전 점수</h4>
                <div className="text-3xl font-bold text-lookout-blue">92<span className="text-sm">/100</span></div>
                <p className="text-xs text-lookout-dark mt-2">최근 7일 기준</p>
              </div>
              <div className="bg-lookout-green/10 rounded-lg p-4 text-center">
                <h4 className="text-sm font-medium text-lookout-gray mb-2">안전구역 준수율</h4>
                <div className="text-3xl font-bold text-lookout-green">98<span className="text-sm">%</span></div>
                <p className="text-xs text-lookout-dark mt-2">안전구역 내 체류 비율</p>
              </div>
              <div className="bg-lookout-yellow/10 rounded-lg p-4 text-center">
                <h4 className="text-sm font-medium text-lookout-gray mb-2">감지된 위험 요소</h4>
                <div className="text-3xl font-bold text-lookout-yellow">2<span className="text-sm">회</span></div>
                <p className="text-xs text-lookout-dark mt-2">최근 30일 기준</p>
              </div>
            </div>
            
            <h4 className="font-medium text-lookout-dark mb-3">장소별 안전 점수</h4>
            <div className="space-y-3">
              {[
                { name: "유치원", score: 98, color: "bg-lookout-green" },
                { name: "놀이터", score: 85, color: "bg-lookout-teal" },
                { name: "학원", score: 92, color: "bg-lookout-blue" },
                { name: "집 주변", score: 95, color: "bg-lookout-blue" }
              ].map((place) => (
                <div key={place.name} className="flex items-center">
                  <div className="w-24 md:w-32 text-sm text-lookout-dark">{place.name}</div>
                  <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${place.color} rounded-full`} 
                      style={{ width: `${place.score}%` }}
                    ></div>
                  </div>
                  <div className="w-10 text-right text-sm font-medium ml-2">{place.score}</div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h4 className="font-medium text-lookout-dark mb-3">AI 안전 제안</h4>
              <div className="space-y-2">
                <div className="bg-lookout-beige/30 rounded-lg p-3">
                  <div className="flex">
                    <ShieldAlert className="h-5 w-5 text-lookout-blue mr-2 flex-shrink-0" />
                    <p className="text-sm text-lookout-dark">놀이터에서의 안전 구역을 확장하는 것이 좋습니다. 현재보다 10m 더 넓게 설정하세요.</p>
                  </div>
                  <Button size="sm" className="mt-2 h-8 bg-lookout-blue/10 text-lookout-blue hover:bg-lookout-blue/20">
                    적용하기
                  </Button>
                </div>
                <div className="bg-lookout-beige/30 rounded-lg p-3">
                  <div className="flex">
                    <ShieldAlert className="h-5 w-5 text-lookout-blue mr-2 flex-shrink-0" />
                    <p className="text-sm text-lookout-dark">학원 근처 횡단보도에 위험 구역을 추가하세요. 이 지역에서 아이가 혼자 이동하는 패턴이 감지되었습니다.</p>
                  </div>
                  <Button size="sm" className="mt-2 h-8 bg-lookout-blue/10 text-lookout-blue hover:bg-lookout-blue/20">
                    적용하기
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="patterns" className="mt-4">
          <div className="bg-white rounded-lg shadow-sm border border-border p-6">
            <h3 className="text-lg font-semibold text-lookout-dark mb-4">이동 패턴 분석</h3>
            <p className="text-lookout-gray mb-6">AI가 분석한 아이의 주요 이동 패턴입니다.</p>
            
            <div className="h-64 bg-lookout-teal/10 rounded-lg flex items-center justify-center mb-6">
              <p className="text-lookout-gray">이동 패턴 지도 시각화</p>
            </div>
            
            <h4 className="font-medium text-lookout-dark mb-3">주요 이동 경로</h4>
            <div className="space-y-2">
              <div className="bg-white border border-border rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-lookout-blue/10 flex items-center justify-center mr-3">
                      <Clock className="h-4 w-4 text-lookout-blue" />
                    </div>
                    <div>
                      <p className="font-medium text-lookout-dark">집 → 유치원</p>
                      <p className="text-xs text-lookout-gray">매일 오전 8:30 ~ 9:00</p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="text-lookout-blue">
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="bg-white border border-border rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-lookout-blue/10 flex items-center justify-center mr-3">
                      <Clock className="h-4 w-4 text-lookout-blue" />
                    </div>
                    <div>
                      <p className="font-medium text-lookout-dark">유치원 → 놀이터</p>
                      <p className="text-xs text-lookout-gray">월, 수, 금 오후 3:00 ~ 3:30</p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="text-lookout-blue">
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="bg-white border border-border rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-lookout-blue/10 flex items-center justify-center mr-3">
                      <Clock className="h-4 w-4 text-lookout-blue" />
                    </div>
                    <div>
                      <p className="font-medium text-lookout-dark">놀이터 → 집</p>
                      <p className="text-xs text-lookout-gray">월, 수, 금 오후 5:30 ~ 6:00</p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="text-lookout-blue">
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="anomalies" className="mt-4">
          <div className="bg-white rounded-lg shadow-sm border border-border p-6">
            <h3 className="text-lg font-semibold text-lookout-dark mb-4">이상 행동 감지</h3>
            <p className="text-lookout-gray mb-6">최근 감지된 이상 행동 패턴입니다.</p>
            
            <div className="space-y-4">
              <div className="bg-lookout-yellow/10 border border-lookout-yellow/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="h-5 w-5 text-lookout-yellow" />
                  <h4 className="font-medium text-lookout-dark">비정상 이동 경로 감지</h4>
                  <span className="ml-auto text-xs bg-lookout-yellow/20 text-lookout-yellow px-2 py-0.5 rounded-full">2023년 5월 3일</span>
                </div>
                <p className="text-sm text-lookout-dark mb-3">
                  유치원에서 학원으로 이동하는 경로가 평소와 달랐습니다. 정상 경로보다 약 200m 이탈했습니다.
                </p>
                <Button size="sm" className="bg-lookout-yellow/20 text-lookout-yellow hover:bg-lookout-yellow/30">
                  상세 보기
                </Button>
              </div>
              
              <div className="bg-lookout-green/10 border border-lookout-green/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="h-5 w-5 text-lookout-green" />
                  <h4 className="font-medium text-lookout-dark">빠른 이동 속도 감지 (정상)</h4>
                  <span className="ml-auto text-xs bg-lookout-green/20 text-lookout-green px-2 py-0.5 rounded-full">2023년 5월 1일</span>
                </div>
                <p className="text-sm text-lookout-dark mb-3">
                  평소보다 빠른 이동 속도가 감지되었으나, 이는 보호자와 함께 차량으로 이동한 것으로 확인되었습니다.
                </p>
                <Button size="sm" className="bg-lookout-green/20 text-lookout-green hover:bg-lookout-green/30">
                  상세 보기
                </Button>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="font-medium text-lookout-dark mb-3">감지 설정</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-lookout-blue/10 flex items-center justify-center mr-3">
                      <AlertTriangle className="h-4 w-4 text-lookout-blue" />
                    </div>
                    <div>
                      <p className="font-medium text-lookout-dark">이상 경로 감지</p>
                      <p className="text-xs text-lookout-gray">패턴에서 벗어난 이동 경로 감지</p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-lookout-blue text-white">활성화됨</Button>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-lookout-blue/10 flex items-center justify-center mr-3">
                      <AlertTriangle className="h-4 w-4 text-lookout-blue" />
                    </div>
                    <div>
                      <p className="font-medium text-lookout-dark">비정상 속도 감지</p>
                      <p className="text-xs text-lookout-gray">비정상적인 빠른/느린 이동 속도 감지</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="border-lookout-blue/20 text-lookout-dark">활성화</Button>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-lookout-blue/10 flex items-center justify-center mr-3">
                      <AlertTriangle className="h-4 w-4 text-lookout-blue" />
                    </div>
                    <div>
                      <p className="font-medium text-lookout-dark">장시간 멈춤 감지</p>
                      <p className="text-xs text-lookout-gray">비정상적인 장시간 동일 위치 체류 감지</p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-lookout-blue text-white">활성화됨</Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default AIReportsPage;
