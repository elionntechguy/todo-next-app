export interface Todo {
  userId?: number;
  userName?: string;
  id?: string;
  title: string;
  description: string;
  status?: string;
}

export interface User {
  id: number;
  name: string;
}

export interface TodoState {
  pending: boolean;
  todos: Todo[];
  users: User[];
  error: string | null;
}