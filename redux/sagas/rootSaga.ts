import { AnyAction } from 'redux';

import axios from 'axios';
import { all, call, takeLatest, takeEvery, put } from 'redux-saga/effects';
import { getTodoSuccess, getTodoFailure, addTodo, deleteTodo, editTodo } from "../actions/todoAction";
import { GET_TODO, GET_TODO_SUCCESS, GET_TODO_FAILURE, ADD_TODO, EDIT_TODO, DELETE_TODO } from "../types/todo/actionTypes"
import { Todo } from "../types/todo/types";

import { User } from '../types/user/types';

import { v4 as uuidv4 } from 'uuid'

// Fetch Users from API
const fetchUsersFromAPI = async () => {
  const users = await axios('https://swapi.dev/api/people');
  users.data.results.map((user: { name: string }) => {
    const saveUser: User = {
      id: uuidv4(),
      name: user.name,
    }
    localStorage['USERS'] = JSON.stringify([saveUser]);
  })
  const usersFromStorage = localStorage['USERS'] || "[]";
  return JSON.parse(usersFromStorage)
}

// Fetch Todos from API/LocalStorage
const fetchTodosFromAPI = () => {
  const todos = localStorage['TODOS'] || "[]";
  return JSON.parse(todos);
}

function* fetchTodos(): any {
  try {
    const todos = yield call(fetchTodosFromAPI);
    if (todos) {
      yield put(getTodoSuccess(todos))
    }
  } catch (e) {
    yield put(getTodoFailure(e as string));
  }
}

// Add Todo to API/LocalStorage
const fetchAddTodoFromAPI = async (title: string, description: string) => {
  const users: Array<User> = await fetchUsersFromAPI();
  let user = users[Math.floor(Math.random() * users.length)]
  const todo: Todo = {
    userId: user.id,
    id: uuidv4(),
    title: title,
    description: description,
    status: 'To Do'
  }
  localStorage['TODOS'] = JSON.stringify([...fetchTodosFromAPI(), todo])
}

function* fetchAddTodo(action: AnyAction): any {
  if (action.title && action.description) {
    const actionTitle = action.title.trim();
    const actionDescription = action.description.trim();
    const todo = yield call(fetchAddTodoFromAPI, actionTitle, actionDescription)
    if (todo) {
      yield put(addTodo(todo))
    }
  }
}

function* watchFetchAddTodo() {
  yield takeLatest(ADD_TODO, fetchAddTodo)
}

// Delete Todo From API/LocalStorage
const fetchDeleteTodoFromAPI = (id: string) => {
  localStorage['TODOS'] = JSON.stringify([...fetchTodosFromAPI().filter((todo: Todo) => todo.id !== id)])
  return true;
}

function* fetchDeleteTodo(action: AnyAction): any {
  const deleted = yield call(fetchDeleteTodoFromAPI, action.id)
  if (deleted) {
    yield put(deleteTodo(action.id))
  }
}

function* watchFetchDeleteTodo() {
  yield takeEvery(DELETE_TODO, fetchDeleteTodo)
}

// Update Todo from API/LocalStorage
const fetchUpdateTodoFromAPI = (id: string, title: string, description: string, status: string) => {
  let updatedTodo = null;
  localStorage['TODOS'] = JSON.stringify([...fetchTodosFromAPI().map((todo: Todo) => {
    if (todo.id === id) {
      updatedTodo = { ...todo, title: title, description: description, status: status };
      return updatedTodo;
    } else {
      return todo;
    }
  })])
  return updatedTodo;
}

function* fetchUpdateTodo(action: AnyAction): any {
  if (action.title && action.description && action.status) {
    const actionTitle = action.title.trim();
    const actionDescription = action.description.trim();
    const actionStatus = action.status;
    const todo = yield call(fetchUpdateTodoFromAPI, action.id, actionTitle, actionDescription, actionStatus)
    if (todo) {
      yield put(editTodo(todo))
    }
  }
}

function* watchFetchUpdateTodo() {
  yield takeLatest(EDIT_TODO, fetchUpdateTodo)
}

const todosSagas = [
  fetchTodos(),
  watchFetchAddTodo(),
  watchFetchDeleteTodo(),
  watchFetchUpdateTodo()
]

export default function* rootSaga() {
  yield all(todosSagas);
}
