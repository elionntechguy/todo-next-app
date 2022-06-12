import React, { FC, Fragment } from 'react';

import { Menu, Transition } from '@headlessui/react';

type Props = {
  todo: any;
  setShowModal: (val: number) => void;
  editMode: boolean;
  setEditMode: (val: boolean) => void;
  deleteTask: (id: string) => void;
};

const TodoOptions: FC<Props> = ({
  todo,
  setShowModal,
  editMode,
  setEditMode,
  deleteTask,
}) => {
  return (
    <div className="top-16 text-right">
      <Menu as="div" className="relative inline-block">
        <div className="w-20 md:w-40">
          <Menu.Button className="inline-flex w-full justify-start rounded-md bg-black bg-opacity-20 px-4 py-2 text-xs md:text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Options
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-10 mt-2 w-20 md:w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    disabled={editMode ? true : false}
                    className={`${
                      active
                        ? 'bg-violet-500 text-white'
                        : editMode
                        ? 'text-slate-400'
                        : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => setEditMode(true)}
                  >
                    {/* {active ? (
                      
                    ) : (
                      <EditInactiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )} */}
                    Edit
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => {
                      deleteTask(todo.id);
                      setShowModal(0);
                    }}
                  >
                    {/* {active ? (
                      <DeleteActiveIcon
                        className="mr-2 h-5 w-5 text-violet-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <DeleteInactiveIcon
                        className="mr-2 h-5 w-5 text-violet-400"
                        aria-hidden="true"
                      />
                    )} */}
                    Delete
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default TodoOptions;
