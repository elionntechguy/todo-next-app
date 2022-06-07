import { createSelector } from "reselect";

import { RootState } from '../reducers/rootReducer';

const getPending = (state: RootState) => state.todos.pending
const getTodos = (state: RootState) => state.todos.todos
const getError = (state: RootState) => state.todos.error

export const getTodosSelector = createSelector(getTodos, (todos) => todos)
export const getPendingSelector = createSelector(getPending, (pending) => pending)
export const getErrorSelector = createSelector(getError, (error) => error)
