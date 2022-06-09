import React, { FC, useEffect } from 'react';
import { useState } from 'react';

import TodoModal from './TodoModal';

const TodoTasks: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div className="my-4">
      <div
        className="p-4 bg-slate-100 cursor-pointer rounded-md"
        onClick={() => setShowModal(true)}
      >
        <div className="flex flex-row items-center justify-between">
          <p className="text-slate-700 text-lg truncate">Wash laundry...</p>
          <p className="text-slate-500 text-xs">Luke Skywalker</p>
        </div>
        <TodoModal showModal={showModal} setShowModal={setShowModal} />
      </div>
    </div>
  );
};

export default TodoTasks;
