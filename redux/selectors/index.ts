import { createSelector } from "reselect";

import { RootState } from '../reducers/rootReducer';

const getPending = (state: RootState) => state.todos.pending
const getTodos = (state: RootState) => state.todos.todos
const getError = (state: RootState) => state.todos.error

const getUsers = (state: RootState) => state.todos.users

export const getTodosSelector = createSelector(getTodos, (todos) => todos)
export const getPendingSelector = createSelector(getPending, (pending) => pending)
export const getErrorSelector = createSelector(getError, (error) => error)

export const getUsersSelector = createSelector(getUsers, (users) => users)