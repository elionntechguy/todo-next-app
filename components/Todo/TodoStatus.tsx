import React, { FC, Fragment } from 'react';

import { Listbox, Transition } from '@headlessui/react';

const statuses = [{ name: 'To Do' }, { name: 'In Progress' }, { name: 'Done' }];

type Props = {
  todo: any;
  editTask: (
    id: string,
    title: string,
    description: string,
    userId: number,
    status: string
  ) => void;
};

const TodoStatus: FC<Props> = ({ todo, editTask }) => {
  const { id, title, description, userId, status } = todo;

  return (
    <div className="w-20 md:w-40">
      <Listbox
        value={status}
        onChange={({ name: newStatus }) =>
          editTask(id, title, description, userId, newStatus)
        }
      >
        <div className="relative">
          <Listbox.Button
            className={`relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-8 text-xs md:text-sm text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 ${
              status === 'To Do'
                ? 'bg-red-400'
                : status === 'In Progress'
                ? 'bg-orange-400'
                : status === 'Done'
                ? 'bg-green-400'
                : null
            }`}
          >
            <span className="block truncate">{status}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              {/* <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              /> */}
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="z-10 absolute flex flex-col mt-1 max-h-60 w-full text-xs md:text-sm overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {statuses.map(({ name }) => (
                <Listbox.Option
                  key={name}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-3 pr-4 ${
                      active && status === 'To Do'
                        ? 'bg-red-200 text-red-700'
                        : active && status === 'In Progress'
                        ? 'bg-orange-200 text-orange-700'
                        : active && status === 'Done'
                        ? 'bg-green-200 text-green-700'
                        : 'text-gray-900'
                    }`
                  }
                  value={{ name }}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {name}
                      </span>
                      {/* {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null} */}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default TodoStatus;
