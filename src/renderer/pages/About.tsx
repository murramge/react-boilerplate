import React, { useState, useEffect } from "react";
import { checkApiHealth } from "../services/api";

export const About: React.FC = () => {
  const [apiStatus, setApiStatus] = useState<"checking" | "online" | "offline">(
    "checking"
  );
  const [systemInfo] = useState({
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    cookieEnabled: navigator.cookieEnabled,
    onLine: navigator.onLine,
  });

  useEffect(() => {
    const checkApi = async () => {
      const isHealthy = await checkApiHealth();
      setApiStatus(isHealthy ? "online" : "offline");
    };

    checkApi();
    const interval = setInterval(checkApi, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: "현대적인 스택",
      description: "React 18, TypeScript, Vite를 사용한 최신 개발 환경",
      icon: "⚡",
    },
    {
      title: "멀티 플랫폼",
      description: "웹과 데스크톱 앱을 동시에 지원하는 Electron 통합",
      icon: "🖥️",
    },
    {
      title: "API 통합",
      description: "Express.js 기반의 RESTful API와 TanStack Query 연동",
      icon: "🔌",
    },
    {
      title: "개발자 경험",
      description: "Hot reload, TypeScript, ESLint로 최적화된 개발 환경",
      icon: "🛠️",
    },
    {
      title: "테스트 지원",
      description: "Vitest와 Testing Library로 구성된 테스트 환경",
      icon: "🧪",
    },
    {
      title: "모던 UI",
      description: "Tailwind CSS로 구성된 반응형 사용자 인터페이스",
      icon: "🎨",
    },
  ];

  const techStack = {
    frontend: [
      {
        name: "React",
        version: "19.1.1",
        description: "사용자 인터페이스 라이브러리",
      },
      {
        name: "TypeScript",
        version: "5.9.2",
        description: "타입 안전성을 위한 언어",
      },
      { name: "Vite", version: "7.1.3", description: "빠른 빌드 도구" },
      {
        name: "React Router",
        version: "7.8.2",
        description: "클라이언트 사이드 라우팅",
      },
      {
        name: "TanStack Query",
        version: "5.85.5",
        description: "서버 상태 관리",
      },
      {
        name: "Tailwind CSS",
        version: "4.1.12",
        description: "유틸리티 기반 CSS 프레임워크",
      },
    ],
    backend: [
      {
        name: "Node.js",
        version: "N/A",
        description: "JavaScript 런타임",
      },
      {
        name: "Express",
        version: "5.1.0",
        description: "웹 애플리케이션 프레임워크",
      },
      { name: "CORS", version: "2.8.5", description: "교차 출처 리소스 공유" },
      { name: "Helmet", version: "8.1.0", description: "보안 미들웨어" },
    ],
    tools: [
      {
        name: "Electron",
        version: "37.3.1",
        description: "데스크톱 앱 프레임워크",
      },
      { name: "Vitest", version: "3.2.4", description: "테스트 프레임워크" },
      { name: "ESLint", version: "9.34.0", description: "코드 품질 도구" },
      { name: "pnpm", version: "10.15.0", description: "패키지 매니저" },
    ],
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">About Boilerplate</h1>
        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
          현대적인 웹과 데스크톱 애플리케이션을 위한 완전한 보일러플레이트
          프로젝트입니다.
        </p>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            시스템 상태
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">API 서버</span>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    apiStatus === "online"
                      ? "bg-green-500"
                      : apiStatus === "offline"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }`}
                ></div>
                <span
                  className={`text-sm font-medium ${
                    apiStatus === "online"
                      ? "text-green-600"
                      : apiStatus === "offline"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {apiStatus === "online"
                    ? "온라인"
                    : apiStatus === "offline"
                    ? "오프라인"
                    : "확인 중..."}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">네트워크</span>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    systemInfo.onLine ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <span
                  className={`text-sm font-medium ${
                    systemInfo.onLine ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {systemInfo.onLine ? "연결됨" : "연결 안됨"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            브라우저 정보
          </h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium">플랫폼:</span> {systemInfo.platform}
            </div>
            <div>
              <span className="font-medium">언어:</span> {systemInfo.language}
            </div>
            <div>
              <span className="font-medium">쿠키:</span>{" "}
              {systemInfo.cookieEnabled ? "활성화" : "비활성화"}
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">주요 기능</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="card p-6">
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">기술 스택</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {Object.entries(techStack).map(([category, items]) => (
            <div key={category} className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 capitalize">
                {category === "frontend" && "프론트엔드"}
                {category === "backend" && "백엔드"}
                {category === "tools" && "도구"}
              </h3>
              <div className="space-y-3">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-100 pb-2 last:border-b-0"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-gray-900">
                          {item.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {item.description}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 ml-2">
                        v{item.version}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Getting Started */}
      <div className="card p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">시작하기</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              개발 환경 실행
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
              <div className="text-gray-600"># 의존성 설치</div>
              <div className="text-gray-900">pnpm install</div>
              <br />
              <div className="text-gray-600">
                # 개발 서버 시작 (API + Web + Electron)
              </div>
              <div className="text-gray-900">pnpm dev</div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              프로덕션 빌드
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
              <div className="text-gray-600"># 전체 빌드</div>
              <div className="text-gray-900">pnpm build</div>
              <br />
              <div className="text-gray-600"># Electron 앱 패키징</div>
              <div className="text-gray-900">pnpm electron:dist</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
