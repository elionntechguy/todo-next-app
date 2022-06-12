import React, { FC, useState } from 'react';

import TodoModal from './TodoModal';

type Props = {
  todos: any;
  users: any;
  pending: any;
  error: any;
  editTask: (
    id: string,
    title: string,
    description: string,
    userId: number,
    status: string
  ) => void;
  deleteTask: (id: string) => void;
};

const TodoTasks: FC<Props> = ({
  todos,
  users,
  pending,
  error,
  editTask,
  deleteTask,
}) => {
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
        todos.map((todo: any) => {
          const { id, title, userName } = todo;
          return (
            <div
              key={id}
              className="p-4 bg-slate-100 cursor-pointer rounded-md"
              onClick={() => setShowModal(id)}
            >
              <div className="flex flex-row items-center justify-between">
                <p className="text-slate-700 text-lg truncate">{title}</p>
                <p className="text-slate-500 text-xs">{userName}</p>
              </div>
              <TodoModal
                showModal={showModal}
                setShowModal={setShowModal}
                todo={todo}
                users={users}
                editTask={editTask}
                deleteTask={deleteTask}
              />
            </div>
          );
        })
      )}
    </div>
  );
};

export default TodoTasks;
