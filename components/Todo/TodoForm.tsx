import React, { FC } from 'react';

const TodoForm: FC = () => {
  return (
    <div className="w-full">
      <div className="space-y-2">
        <p className="text-slate-800 text-2xl">Todo App</p>
        <div className="my-2">
          <div className="flex space-x-2">
            <div className="space-y-2">
              <input
                type="text"
                id="title"
                placeholder="Write your task title..."
                className="px-3 py-3 placeholder-slate-400 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
              />
              <textarea
                rows={3}
                placeholder="Write your task description..."
                className="resize-none px-3 py-3 placeholder-slate-400 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
              />
            </div>
            <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded text-xl">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoForm;
