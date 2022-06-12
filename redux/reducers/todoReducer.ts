import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction } from 'redux';

import {
  GET_TODO,
  GET_USERS,
  GET_TODO_SUCCESS,
  GET_TODO_FAILURE,
  ADD_TODO_SUCCESS,
  EDIT_TODO_SUCCESS,
  DELETE_TODO,
} from '../types/todo/actionTypes';

import { TodoState } from '../types/todo/types';

const todoReducer = (
  state: TodoState = { todos: [], users: [], pending: false, error: null },
  action: AnyAction
): TodoState => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case GET_USERS:
      return { ...state, users: [...action.payload] };
    case GET_TODO:
      return { ...state, pending: true };
    case GET_TODO_SUCCESS:
      return {
        todos: action.payload,
        users: action.payload,
        pending: false,
        error: null,
      };
    case GET_TODO_FAILURE:
      return { ...state, pending: false, error: action.payload.error };
    case ADD_TODO_SUCCESS:
      return { ...state, todos: [...state.todos, action.payload] };
    case EDIT_TODO_SUCCESS:
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
        ...state,
      };
  }
};

export default todoReducer;
