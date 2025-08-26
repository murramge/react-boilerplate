import React from "react";

export const Home: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          Welcome to <span className="text-primary-600">Boilerplate</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Node.js API + React + Electron으로 구축된 현대적인 보일러플레이트
          프로젝트입니다.
        </p>
      </div>

      {/* Features Grid */}
      <div className="mt-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl">⚡</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">빠른 개발</h3>
                <p className="text-sm text-gray-500">Vite + React 18</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl">🔧</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  TypeScript
                </h3>
                <p className="text-sm text-gray-500">타입 안정성</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl">🖥️</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Electron</h3>
                <p className="text-sm text-gray-500">데스크톱 앱</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl">🌐</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">웹 지원</h3>
                <p className="text-sm text-gray-500">멀티 플랫폼</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="card p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">기술 스택</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              프론트엔드
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>• React 18 + TypeScript</li>
              <li>• Vite (빌드 도구)</li>
              <li>• React Router (라우팅)</li>
              <li>• TanStack Query (데이터 페칭)</li>
              <li>• Tailwind CSS (스타일링)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">백엔드</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Node.js + Express</li>
              <li>• TypeScript</li>
              <li>• RESTful API</li>
              <li>• CORS + Helmet</li>
              <li>• Error Handling</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Start */}
      <div className="card p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">시작하기</h2>
        <div className="bg-gray-50 rounded-lg p-4">
          <pre className="text-sm text-gray-800">
            {`# 개발 서버 시작
pnpm dev

# 빌드
pnpm build

# Electron 앱 패키징
pnpm electron:dist`}
          </pre>
        </div>
      </div>
    </div>
  );
};
