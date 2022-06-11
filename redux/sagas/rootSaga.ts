import { AnyAction } from 'redux';

import axios from 'axios';
import { all, call, takeLatest, takeEvery, put } from 'redux-saga/effects';
import { getTodoSuccess, getTodoFailure, addTodo, deleteTodo, editTodo, getUsers, addTodoSuccess } from "../actions/todoAction";
import { ADD_TODO, EDIT_TODO, DELETE_TODO } from "../types/todo/actionTypes"
import { Todo, User } from "../types/todo/types";

import { v4 as uuidv4 } from 'uuid'

const ISSERVER = typeof window === "undefined";

// Fetch Users from API
const fetchUsersFromAPI = async () => {
  const getAllUsers = async () => {
    const users = await axios('https://swapi.dev/api/people');
    let outsideId = 0
    return users.data.results.map((user: { name: string }) => {
      const saveUser: User = {
        id: outsideId++,
        name: user.name,
      }
      return saveUser;
    })
  }
  if (!ISSERVER) {
    const usersFromStorage = localStorage.getItem('USERS') || "[]";
    if (usersFromStorage === "[]") {
      localStorage.setItem('USERS', JSON.stringify(await getAllUsers()));
    }
    return JSON.parse(usersFromStorage)
  }
}

function* fetchUsers(): any {
  const users = yield call(fetchUsersFromAPI);
  if (users) {
    yield put(getUsers(users))
  }
}

// Fetch Todos from API/LocalStorage
const fetchTodosFromAPI = () => {
  if (!ISSERVER) {
    const todos = localStorage.getItem('TODOS') || "[]";
    return JSON.parse(todos);
  }
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
  const usersFromStorage = localStorage.getItem('USERS') || "[]";
  const users: Array<User> = JSON.parse(usersFromStorage);
  let user = users[Math.floor(Math.random() * users.length)]
  const todo: Todo = {
    userId: user.id,
    userName: user.name,
    id: uuidv4(),
    title: title,
    description: description,
    status: 'To Do'
  }
  if (!ISSERVER) {
    localStorage.setItem('TODOS', JSON.stringify([...fetchTodosFromAPI(), todo]))
    return todo;
  }
}

function* fetchAddTodo(action: AnyAction): any {
  if (action.payload.title && action.payload.description) {
    const actionTitle = action.payload.title.trim();
    const actionDescription = action.payload.description.trim();
    const todo = yield call(fetchAddTodoFromAPI, actionTitle, actionDescription)
    if (todo) {
      yield put(addTodoSuccess(todo))
    }
  }
}

function* watchFetchAddTodo() {
  yield takeLatest(ADD_TODO, fetchAddTodo)
}

// Delete Todo From API/LocalStorage
const fetchDeleteTodoFromAPI = (id: string) => {
  if (!ISSERVER) {
    localStorage.setItem('TODOS', JSON.stringify([...fetchTodosFromAPI().filter((todo: Todo) => todo.id !== id)]))
  }
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
  if (!ISSERVER) {
    localStorage.setItem('TODOS', JSON.stringify([...fetchTodosFromAPI().map((todo: Todo) => {
      if (todo.id === id) {
        updatedTodo = { ...todo, title: title, description: description, status: status };
        return updatedTodo;
      } else {
        return todo;
      }
    })]))
  }
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
  fetchUsers(),
  fetchTodos(),
  watchFetchAddTodo(),
  watchFetchDeleteTodo(),
  watchFetchUpdateTodo()
]

export default function* rootSaga() {
  yield all(todosSagas);
}
