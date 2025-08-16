"use server";

import { revalidatePath } from "next/cache";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export async function getTodos(): Promise<Todo[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      cache: "no-store", // 항상 최신 데이터를 가져오기 위해
    });

    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }

    const todos: Todo[] = await response.json();
    // 처음 10개만 반환
    return todos.slice(0, 10);
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
}

export async function createTodo(title: string) {
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

    // 페이지를 다시 렌더링하여 새로운 데이터를 보여줌
    revalidatePath("/todo-server");
    return newTodo;
  } catch (error) {
    console.error("Error creating todo:", error);
    throw new Error("할일 생성에 실패했습니다.");
  }
}

export async function toggleTodo(todo: Todo) {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...todo,
        completed: !todo.completed,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update todo");
    }

    const updatedTodo: Todo = await response.json();

    revalidatePath("/todo-server");
    return updatedTodo;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw new Error("할일 업데이트에 실패했습니다.");
  }
}

export async function deleteTodo(id: number) {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete todo");
    }

    revalidatePath("/todo-server");
    return { success: true };
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw new Error("할일 삭제에 실패했습니다.");
  }
}
