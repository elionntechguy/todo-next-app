import { HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "redux";

import { GET_TODO, GET_TODO_SUCCESS, GET_TODO_FAILURE, ADD_TODO, EDIT_TODO, DELETE_TODO } from "../types/todo/actionTypes"

import { TodoState } from "../types/todo/types";

const todoReducer = (state: TodoState = { todos: [], pending: false, error: null}, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case GET_TODO:
      return { ...state, pending: true };
    case GET_TODO_SUCCESS:
      return { todos: action.payload, pending: false, error: null };
    case GET_TODO_FAILURE:
      return { ...state, pending: false, error: action.payload.error };
    case ADD_TODO:
      return { ...state, todos: action.payload.todos };
    case EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((i) => i.id !== action.payload.id),
      };
    default:
      return {
        ...state
      };
  }
}

export default todoReducer;