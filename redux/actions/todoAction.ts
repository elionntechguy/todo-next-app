import { GET_TODO, GET_TODO_SUCCESS, GET_TODO_FAILURE, ADD_TODO, EDIT_TODO, DELETE_TODO } from "../types/todo/actionTypes"
import { Todo } from "../types/todo/types";

export const getTodo = () => ({
  type: GET_TODO,
});

export const getTodoSuccess = (todo: Todo) => ({
  type: GET_TODO_SUCCESS,
  payload: todo,
});

export const getTodoFailure = (error: string) => ({
  type: GET_TODO_FAILURE,
  payload: error,
});

export const addTodo = (todo: Todo) => ({
  type: ADD_TODO,
  payload: todo,
});

export const editTodo = (todo: Todo) => ({
  type: EDIT_TODO,
  payload: todo,
});

export const deleteTodo = (todo: Todo) => ({
  type: DELETE_TODO,
  payload: todo.id,
});
