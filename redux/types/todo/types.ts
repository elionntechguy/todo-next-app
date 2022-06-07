export interface Todo {
  userId: string;
  id: string;
  title: string;
  description: string;
  status: string;
}

export interface TodoState {
  pending: boolean;
  todos: Todo[];
  error: string | null;
}
