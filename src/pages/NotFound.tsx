
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lookout-blue/5 to-lookout-teal/5">
      <div className="text-center px-4 max-w-lg">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-lookout-blue to-lookout-teal flex items-center justify-center">
            <span className="text-4xl">🔍</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-2 text-lookout-dark">페이지를 찾을 수 없습니다</h1>
        <p className="text-xl text-lookout-gray mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
        </p>
        <Button
          className="bg-gradient-to-r from-lookout-blue to-lookout-teal text-white lookout-button"
          onClick={() => window.location.href = "/"}
        >
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
