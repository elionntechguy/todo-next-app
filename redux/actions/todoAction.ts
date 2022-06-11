import { GET_TODO, GET_TODO_SUCCESS, GET_TODO_FAILURE, ADD_TODO, ADD_TODO_SUCCESS, EDIT_TODO, DELETE_TODO, GET_USERS } from "../types/todo/actionTypes"
import { Todo, User } from "../types/todo/types";

export const getTodo = () => ({
  type: GET_TODO,
});

export const getUsers = (user: User) => ({
  type: GET_USERS,
  payload: user
})

export const getTodoSuccess = (todo: Todo) => ({
  type: GET_TODO_SUCCESS,
  payload: todo,
});

export const getTodoFailure = (error: string) => ({
  type: GET_TODO_FAILURE,
  payload: error,
});

export const addTodo = (title: string, description: string) => ({
  type: ADD_TODO,
  payload: {
    title,
    description
  }
});

export const addTodoSuccess = (todo: Todo) => ({
  type: ADD_TODO_SUCCESS,
  payload: todo,
});

export const editTodo = (id: number, title?: string, description?: string, status?: string, user?: number) => ({
  type: EDIT_TODO,
  payload: {
    id,
    title,
    description,
    status,
    user
  },
});

export const editTodoSuccess = (todo: Todo) => ({
  type: EDIT_TODO,
  payload: todo,
});

export const deleteTodo = (todo: Todo) => ({
  type: DELETE_TODO,
  payload: todo.id,
});
