import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <Image
            className="dark:invert mx-auto mb-6"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            📝 ToDo App Collection
          </h1>
          <p className="text-lg text-gray-600">
            3가지 다른 방식으로 구현된 ToDo 애플리케이션을 체험해보세요
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Route API 방식 */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-3xl mb-4">🛣️</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Route API 방식
            </h2>
            <p className="text-gray-600 mb-4 text-sm">
              Next.js Route Handler를 통해 API를 구성하고 클라이언트에서 fetch로
              통신하는 방식
            </p>
            <Link
              href="/todo-route"
              className="inline-block w-full text-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              체험하기
            </Link>
          </div>

          {/* 서버 컴포넌트 방식 */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-3xl mb-4">🚀</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              서버 컴포넌트 방식
            </h2>
            <p className="text-gray-600 mb-4 text-sm">
              서버 컴포넌트에서 직접 API를 호출하고 Server Actions를 활용하는
              방식
            </p>
            <Link
              href="/todo-server"
              className="inline-block w-full text-center bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
            >
              체험하기
            </Link>
          </div>

          {/* 클라이언트 컴포넌트 방식 */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-3xl mb-4">⚡</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              클라이언트 컴포넌트 방식
            </h2>
            <p className="text-gray-600 mb-4 text-sm">
              클라이언트 컴포넌트에서 직접 외부 API를 호출하고 상태를 관리하는
              방식
            </p>
            <Link
              href="/todo-client"
              className="inline-block w-full text-center bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors"
            >
              체험하기
            </Link>
          </div>
        </div>

        {/* 기술 정보 */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            🔧 기술 스택
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <strong>프레임워크:</strong> Next.js 16.4.6
            </div>
            <div>
              <strong>스타일링:</strong> Tailwind CSS
            </div>
            <div>
              <strong>API:</strong> JSONPlaceholder
            </div>
            <div>
              <strong>언어:</strong> TypeScript
            </div>
          </div>
        </div>

        {/* 데이터 소스 정보 */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            📊 모든 데이터는{" "}
            <a
              href="https://jsonplaceholder.typicode.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              JSONPlaceholder
            </a>
            에서 제공됩니다
          </p>
        </div>
      </div>
    </div>
  );
}
