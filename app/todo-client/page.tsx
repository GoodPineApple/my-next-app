"use client";

import { useTodos } from "./hooks/useTodos";
import TodoForm from "./components/TodoForm";
import TodoListItem from "./components/TodoListItem";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";

export default function TodoClientPage() {
  const {
    todos,
    loading,
    error,
    addTodo,
    deleteTodo,
    toggleTodo,
    refreshTodos,
    clearError,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              ⚡ ToDo App (클라이언트 컴포넌트 방식)
            </h1>
            <button
              onClick={refreshTodos}
              disabled={loading}
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
            >
              🔄 새로고침
            </button>
          </div>

          {/* 에러 메시지 */}
          {error && <ErrorMessage message={error} onClose={clearError} />}

          {/* 새 todo 추가 폼 */}
          <TodoForm onAddTodo={addTodo} isLoading={loading} />

          {/* 로딩 상태 */}
          {loading && <LoadingSpinner />}

          {/* Todo 목록 */}
          {!loading && (
            <div className="space-y-2">
              {todos.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  할일이 없습니다. 새로운 할일을 추가해보세요!
                </div>
              ) : (
                todos.map((todo) => (
                  <TodoListItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                  />
                ))
              )}
            </div>
          )}

          {/* 통계 정보 */}
          {!loading && todos.length > 0 && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between text-sm text-gray-600">
                <span>전체: {todos.length}개</span>
                <span>완료: {todos.filter((t) => t.completed).length}개</span>
                <span>
                  미완료: {todos.filter((t) => !t.completed).length}개
                </span>
              </div>
            </div>
          )}

          <div className="mt-6 text-sm text-gray-500 text-center">
            ⚡ 이 앱은 클라이언트 컴포넌트에서 직접 JSONPlaceholder API를
            호출합니다
          </div>
        </div>
      </div>
    </div>
  );
}
