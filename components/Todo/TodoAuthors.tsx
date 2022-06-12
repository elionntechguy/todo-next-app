import React, { FC, useState, Fragment } from 'react';

import { Listbox, Transition } from '@headlessui/react';

type Props = {
  todo: any;
  users: any;
  edit: (
    id: string,
    title: string,
    description: string,
    userId: number,
    status: string
  ) => void;
};

const TodoAuthors: FC<Props> = ({ todo, users, edit }) => {
  return (
    <div className="w-20 md:w-40">
      <Listbox
        value={todo.userName}
        onChange={(user: any) =>
          edit(todo.id, todo.title, todo.description, user.id, todo.status)
        }
      >
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-8 text-xs md:text-sm text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
            <span className="block truncate">{todo.userName}</span>
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
            <Listbox.Options className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-xs md:text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {users
                .filter((user: any) => user.id !== todo.userId)
                .map((user: any, index: number) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-3 pr-4 ${
                        active
                          ? 'bg-purple-200 text-purple-600'
                          : 'text-gray-900'
                      }`
                    }
                    value={user}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {user.name}
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

export default TodoAuthors;
