"use client";

import { useState, useEffect } from "react";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 초기 todos 로드
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/todos`);
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }

      const data: Todo[] = await response.json();
      // 처음 10개만 저장
      setTodos(data.slice(0, 10));
    } catch (err) {
      setError("할일 목록을 불러오는데 실패했습니다.");
      console.error("Error fetching todos:", err);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (title: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          completed: false,
          userId: 1,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create todo");
      }

      const newTodo: Todo = await response.json();

      // 새 todo를 목록 맨 앞에 추가
      setTodos((prev) => [newTodo, ...prev]);
      return true;
    } catch (err) {
      console.error("Error creating todo:", err);
      setError("새 할일 추가에 실패했습니다.");
      return false;
    }
  };

  const updateTodo = async (todo: Todo): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${todo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      const updatedTodo: Todo = await response.json();

      setTodos((prev) => prev.map((t) => (t.id === todo.id ? updatedTodo : t)));
      return true;
    } catch (err) {
      console.error("Error updating todo:", err);
      setError("할일 업데이트에 실패했습니다.");
      return false;
    }
  };

  const deleteTodo = async (id: number): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      setTodos((prev) => prev.filter((t) => t.id !== id));
      return true;
    } catch (err) {
      console.error("Error deleting todo:", err);
      setError("할일 삭제에 실패했습니다.");
      return false;
    }
  };

  const toggleTodo = async (todo: Todo): Promise<boolean> => {
    return updateTodo({ ...todo, completed: !todo.completed });
  };

  const clearError = () => setError(null);

  return {
    todos,
    loading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    refreshTodos: fetchTodos,
    clearError,
  };
}
