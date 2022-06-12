import React, { FC, Fragment, useState } from 'react';

import { Dialog, Transition } from '@headlessui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faCheck } from '@fortawesome/free-solid-svg-icons';

import TodoOptions from './TodoOptions';
import TodoAuthors from './TodoAuthors';
import TodoStatus from './TodoStatus';

type Props = {
  showModal: number;
  setShowModal: (val: number) => void;
  todo: any;
  users: any;
  editTask: (
    id: string,
    title: string,
    description: string,
    userId: number,
    status: string
  ) => void;
  deleteTask: (id: string) => void;
};

const TodoModal: FC<Props> = ({
  showModal,
  setShowModal,
  todo,
  users,
  editTask,
  deleteTask,
}) => {
  const { id, title, description, userId, status } = todo;

  const [editMode, setEditMode] = useState<boolean>(false);

  const [todoDetails, setTodoDetails] = useState<{
    title: string;
    description: string;
  }>({ title: '', description: '' });

  // Edit method
  const edit = () => {
    editTask(id, todoDetails.title, todoDetails.description, userId, status);
    setEditMode(false);
  };

  return (
    <Transition appear show={showModal === id} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setShowModal(0)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed z-0 inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="mt-2">
                  <div className="flex flex-col bg-slate-100 w-full p-5 rounded-md">
                    <div className="space-y-6">
                      <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between">
                        <div className="flex flex-col mt-5 md:mt-0 w-full md:min-w-0 basis-1/2">
                          <div className="flex-1 overflow-hidden break-words">
                            <span className="text-xs text-slate-600">
                              Title
                            </span>
                            {editMode ? (
                              <div>
                                <input
                                  type="text"
                                  className="px-3 py-2 placeholder-slate-400 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none w-full"
                                  defaultValue={title}
                                  onChange={(e) => {
                                    setTodoDetails({
                                      title: e.target.value,
                                      description: todoDetails.description,
                                    });
                                  }}
                                />
                              </div>
                            ) : (
                              <p className="text-lg text-slate-800">{title}</p>
                            )}
                          </div>
                          <div className="flex-1 overflow-hidden break-words">
                            <span className="text-xs text-slate-600">
                              Description
                            </span>
                            {editMode ? (
                              <div>
                                <textarea
                                  className="resize-none px-3 py-3 placeholder-slate-400 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none w-full"
                                  defaultValue={description}
                                  onChange={(e) => {
                                    setTodoDetails({
                                      title: todoDetails.title,
                                      description: e.target.value,
                                    });
                                  }}
                                />
                              </div>
                            ) : (
                              <p className="text-sm text-slate-800">
                                {description}
                              </p>
                            )}
                          </div>
                          {editMode ? (
                            <div className="flex flex-row space-x-4">
                              <button
                                className="w-2 text-slate-500 hover:text-slate-700"
                                onClick={() => setEditMode(false)}
                              >
                                <FontAwesomeIcon icon={faClose} size="lg" />
                              </button>
                              <button
                                className="w-2 text-slate-500 hover:text-slate-700"
                                onClick={edit}
                              >
                                <FontAwesomeIcon icon={faCheck} size="lg" />
                              </button>
                            </div>
                          ) : null}
                        </div>
                        <div className="flex flex-row md:flex-col items-center md:space-y-2 space-x-2 md:space-x-0">
                          <div>
                            <span className="text-xs text-slate-600">
                              Status
                            </span>
                            <TodoStatus todo={todo} editTask={editTask} />
                          </div>
                          <div>
                            <span className="text-xs text-slate-600">
                              Assigned User
                            </span>
                            <TodoAuthors
                              users={users}
                              todo={todo}
                              editTask={editTask}
                            />
                          </div>
                          <div>
                            <span className="text-xs text-slate-600">
                              Options
                            </span>
                            <TodoOptions
                              todo={todo}
                              setShowModal={setShowModal}
                              editMode={editMode}
                              setEditMode={setEditMode}
                              deleteTask={deleteTask}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-purple-500 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300 focus-visible:ring-offset-2"
                    onClick={() => setShowModal(0)}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TodoModal;
