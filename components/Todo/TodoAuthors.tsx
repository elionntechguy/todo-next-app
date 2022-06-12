import React, { FC, Fragment } from 'react';

import { Listbox, Transition } from '@headlessui/react';

type Props = {
  todo: any;
  users: any;
  editTask: (
    id: string,
    title: string,
    description: string,
    userId: number,
    status: string
  ) => void;
};

interface usersMap {
  id: number;
  name: string;
}

const TodoAuthors: FC<Props> = ({ todo, users, editTask }) => {
  const { id, title, description, userId, userName, status } = todo;

  return (
    <div className="w-20 md:w-40">
      <Listbox
        value={userName}
        onChange={({ id: newUserId }) =>
          editTask(id, title, description, newUserId, status)
        }
      >
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-8 text-xs md:text-sm text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
            <span className="block truncate">{userName}</span>
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
                .filter(({ id }: usersMap) => id !== userId)
                .map(({ name, id }: usersMap) => (
                  <Listbox.Option
                    key={id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-3 pr-4 ${
                        active
                          ? 'bg-purple-200 text-purple-600'
                          : 'text-gray-900'
                      }`
                    }
                    value={{ id, name }}
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

export default TodoAuthors;
