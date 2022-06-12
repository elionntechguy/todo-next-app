import React, { FC } from 'react';

type Props = {
  addTask: (e: React.FormEvent) => void;
  todoDetails: { title: string; description: string };
  setTodoDetails: (val: { title: string; description: string }) => void;
};

const TodoForm: FC<Props> = ({ addTask, todoDetails, setTodoDetails }) => {
  return (
    <div className="w-full">
      <div className="space-y-2">
        <p className="text-slate-800 text-2xl">Todo App</p>
        <div className="my-2">
          <form onSubmit={addTask}>
            <div className="flex space-x-2">
              <div className="space-y-2">
                <input
                  type="text"
                  id="title"
                  value={todoDetails.title}
                  onChange={(e) => {
                    setTodoDetails({
                      title: e.target.value,
                      description: todoDetails.description,
                    });
                  }}
                  placeholder="Write your task title..."
                  className="px-3 py-3 placeholder-slate-400 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                />
                <textarea
                  value={todoDetails.description}
                  onChange={(e) => {
                    setTodoDetails({
                      title: todoDetails.title,
                      description: e.target.value,
                    });
                  }}
                  rows={3}
                  placeholder="Write your task description..."
                  className="resize-none px-3 py-3 placeholder-slate-400 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                />
              </div>
              <button
                type="submit"
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded text-xl"
              >
                +
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TodoForm;
