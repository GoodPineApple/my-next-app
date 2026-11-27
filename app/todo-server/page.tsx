import { Suspense } from "react";
import { getTodos } from "./actions";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";

// 로딩 컴포넌트
function TodosLoading() {
  return (
    <div className="space-y-2">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded-lg"></div>
        </div>
      ))}
    </div>
  );
}

// 서버 컴포넌트에서 todos를 가져오는 컴포넌트
async function TodosContainer() {
  const todos = await getTodos();

  return <TodoList todos={todos} />;
}

export default function TodoServerPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            🚀 ToDo App (서버 컴포넌트 방식)
          </h1>

          {/* 새 todo 추가 폼 */}
          <AddTodoForm />

          {/* Todo 목록 (서버에서 데이터 가져옴) */}
          <Suspense fallback={<TodosLoading />}>
            <TodosContainer />
          </Suspense>

          <div className="mt-6 text-sm text-gray-500 text-center">
            🔧 이 앱은 서버 컴포넌트에서 직접 JSONPlaceholder API를 호출합니다
          </div>
        </div>
      </div>
    </div>
  );
}

// 요청이 올 때마다 서버에서 할 일을 받아 그림 — 빌드 때 미리 그리지 않음
export const dynamic = "force-dynamic";
