import { NextRequest, NextResponse } from "next/server";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/todos`);
    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }
    const todos: Todo[] = await response.json();
    return NextResponse.json(todos);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to create todo");
    }

    const newTodo: Todo = await response.json();
    return NextResponse.json(newTodo);
  } catch {
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500 }
    );
  }
}
