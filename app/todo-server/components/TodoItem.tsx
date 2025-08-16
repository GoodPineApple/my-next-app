"use client";

import { useState } from "react";
import { Todo, toggleTodo, deleteTodo } from "../actions";

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const [isToggling, setIsToggling] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggle = async () => {
    try {
      setIsToggling(true);
      await toggleTodo(todo);
    } catch (error) {
      console.error("Error toggling todo:", error);
      alert("할일 상태 변경에 실패했습니다.");
    } finally {
      setIsToggling(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteTodo(todo.id);
    } catch (error) {
      console.error("Error deleting todo:", error);
      alert("할일 삭제에 실패했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        disabled={isToggling}
        className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500 disabled:opacity-50"
      />
      <span
        className={`flex-1 ${
          todo.completed ? "text-gray-500 line-through" : "text-gray-800"
        }`}
      >
        {todo.title}
      </span>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="px-3 py-1 text-red-500 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
      >
        {isDeleting ? "삭제 중..." : "삭제"}
      </button>
    </div>
  );
}
