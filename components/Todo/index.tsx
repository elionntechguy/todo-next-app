import React, { FC, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  getPendingSelector,
  getTodosSelector,
  getErrorSelector,
  getUsersSelector,
} from '../../redux/selectors';

import { addTodo, editTodo, deleteTodo } from '../../redux/actions/todoAction';

import TodoForm from './TodoForm';
import TodoTasks from './TodoTasks';

const Todo: FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();
  const pending = useSelector(getPendingSelector);
  const todos = useSelector(getTodosSelector);
  const error = useSelector(getErrorSelector);
  const users = useSelector(getUsersSelector);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const addTodoAction = addTodo(title, description);
    dispatch(addTodoAction);

    setTitle('');
    setDescription('');
  };

  const edit = (
    todoId: string,
    title: string,
    description: string,
    userId: number,
    status: string
  ) => {
    const editAction = editTodo(todoId, title, description, userId, status);
    dispatch(editAction);
  };

  const deleteTask = (todoId: string) => {
    const deleteAction = deleteTodo(todoId);
    dispatch(deleteAction);
  };

  return (
    <div className="relative px-7 py-6 mx-6 md:mx-0 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top">
      <div className="flex flex-col w-full">
        <div>
          <TodoForm
            add={add}
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
          />
        </div>
        <div className="my-2">
          <TodoTasks
            todos={todos}
            users={users}
            pending={pending}
            error={error}
            edit={edit}
            deleteTask={deleteTask}
          />
        </div>
      </div>
    </div>
  );
};

export default Todo;
