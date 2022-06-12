import React, { FC, useState } from 'react';

import TodoModal from './TodoModal';

type Props = {
  todos: any;
  users: any;
  pending: any;
  error: any;
  edit: (
    id: string,
    title: string,
    description: string,
    userId: number,
    status: string
  ) => void;
};

const TodoTasks: FC<Props> = ({ todos, users, pending, error, edit }) => {
  const [showModal, setShowModal] = useState<number>(0);

  return (
    <div className="my-4 space-y-2">
      {pending ? (
        <div className="p-4 bg-slate-100 cursor-pointer rounded-md">
          <div className="flex flex-row items-center justify-between">
            <p className="text-slate-700 text-lg truncate">Loading</p>
          </div>
        </div>
      ) : error ? (
        <div className="p-4 bg-slate-100 cursor-pointer rounded-md">
          <div className="flex flex-row items-center justify-between">
            <p className="text-slate-700 text-lg truncate">
              An error occurred.
            </p>
          </div>
        </div>
      ) : (
        todos.map((todo: any, index: number) => (
          <div
            key={index}
            className="p-4 bg-slate-100 cursor-pointer rounded-md"
            onClick={() => setShowModal(todo.id)}
          >
            <div className="flex flex-row items-center justify-between">
              <p className="text-slate-700 text-lg truncate">{todo.title}</p>
              <p className="text-slate-500 text-xs">{todo.userName}</p>
            </div>
            <TodoModal
              showModal={showModal}
              setShowModal={setShowModal}
              todo={todo}
              users={users}
              edit={edit}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default TodoTasks;
