import React, { FC } from 'react';
import TodoForm from './TodoForm';
import TodoTasks from './TodoTasks';

const Todo: FC = () => {
  return (
    <div className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top w-96">
      <div className="flex flex-col w-full">
        <TodoForm />
        <TodoTasks />
      </div>
    </div>
  );
};

export default Todo;
