"use client";

import { useState } from "react";

interface TodoFormProps {
  onAddTodo: (title: string) => Promise<boolean>;
  isLoading?: boolean;
}

export default function TodoForm({ onAddTodo, isLoading }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const success = await onAddTodo(title.trim());
    if (success) {
      setTitle("");
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="새 할일을 입력하세요..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isSubmitting || isLoading}
      />
      <button
        type="submit"
        disabled={isSubmitting || !title.trim() || isLoading}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? "추가 중..." : "추가"}
      </button>
    </form>
  );
}
