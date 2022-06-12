import React, { FC, useState } from 'react';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import {
  getPendingSelector,
  getTodosSelector,
  getErrorSelector,
  getUsersSelector,
} from '../../redux/selectors';
import { RootState, AppDispatch } from '../../redux/store';
import { addTodo, editTodo, deleteTodo } from '../../redux/actions/todoAction';

import TodoForm from './TodoForm';
import TodoTasks from './TodoTasks';

const Todo: FC = () => {
  const [todoDetails, setTodoDetails] = useState<{
    title: string;
    description: string;
  }>({ title: '', description: '' });

  const useAppDispatch = () => useDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

  const dispatch = useAppDispatch();
  const pending = useAppSelector(getPendingSelector);
  const todos = useAppSelector(getTodosSelector);
  const error = useAppSelector(getErrorSelector);
  const users = useAppSelector(getUsersSelector);

  // Add Task method
  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!todoDetails.title.trim() || !todoDetails.description.trim()) return;

    const addTodoAction = addTodo(todoDetails.title, todoDetails.description);
    dispatch(addTodoAction);

    setTodoDetails({
      title: '',
      description: '',
    });
  };

  // Edit Task method
  const editTask = (
    todoId: string,
    title: string,
    description: string,
    userId: number,
    status: string
  ) => {
    const editAction = editTodo(todoId, title, description, userId, status);
    dispatch(editAction);
  };

  // Delete Task method
  const deleteTask = (todoId: string) => {
    const deleteAction = deleteTodo(todoId);
    dispatch(deleteAction);
  };

  return (
    <div className="relative px-7 py-6 mx-6 md:mx-0 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top">
      <div className="flex flex-col w-full">
        <div>
          <TodoForm
            addTask={addTask}
            todoDetails={todoDetails}
            setTodoDetails={setTodoDetails}
          />
        </div>
        <div className="my-2">
          <TodoTasks
            todos={todos}
            users={users}
            pending={pending}
            error={error}
            editTask={editTask}
            deleteTask={deleteTask}
          />
        </div>
      </div>
    </div>
  );
};

export default Todo;
