"use client";

import { useState } from "react";
import { Todo } from "../hooks/useTodos";

interface TodoListItemProps {
  todo: Todo;
  onToggle: (todo: Todo) => Promise<boolean>;
  onDelete: (id: number) => Promise<boolean>;
}

export default function TodoListItem({
  todo,
  onToggle,
  onDelete,
}: TodoListItemProps) {
  const [isToggling, setIsToggling] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggle = async () => {
    if (isToggling) return;
    setIsToggling(true);
    await onToggle(todo);
    setIsToggling(false);
  };

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    await onDelete(todo.id);
    setIsDeleting(false);
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
        } ${isToggling ? "opacity-50" : ""}`}
      >
        {todo.title}
      </span>
      <span className="text-xs text-gray-400 mr-2">#{todo.id}</span>
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
