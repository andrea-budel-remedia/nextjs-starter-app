'use client';
import React from 'react';
import { classNames } from '@/utils/ui';
import { Combobox, Dialog, Transition } from '@headlessui/react';
import {
  ExclamationCircleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { useSearchProductsQuery } from '@/services/dummy.service';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import reducer, { actions, initialState } from './slice';
import { useDebouncedCallback } from 'use-debounce';

export type SearchProductProps = React.PropsWithChildren<{ open?: boolean }>;

export default function SearchProduct({ open = false }: SearchProductProps) {
  const [state, dispatch] = React.useReducer(reducer, {
    ...initialState,
    isOpen: open,
  });

  const debounceQuery = useDebouncedCallback((value) => {
    dispatch(actions.search({ query: value }));
  }, 500);

  const { data, error, isLoading, isFetching } = useSearchProductsQuery(
    state.search || skipToken
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debounceQuery(event.target.value);
  };

  return (
    <Transition.Root
      show={state.isOpen}
      as={React.Fragment}
      afterLeave={() => dispatch(actions.search(''))}
    >
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20"
        onClose={() => dispatch(actions.close())}
      >
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            as="div"
            className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
          >
            <div className="relative">
              <MagnifyingGlassIcon
                className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <Combobox.Input
                className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
                placeholder="Search..."
                onChange={handleQueryChange}
              />
              {isLoading || isFetching ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 pointer-events-none absolute top-3.5 right-4"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : null}
            </div>

            {data && data?.total > 0 && (
              <Combobox.Options
                static
                className="max-h-96 scroll-py-3 overflow-y-auto p-3"
              >
                {data?.products.map((item) => (
                  <Combobox.Option
                    key={item.id}
                    value={item}
                    className={({ active }) =>
                      classNames(
                        'flex cursor-default select-none rounded-xl p-3',
                        active ? 'bg-gray-100' : ''
                      )
                    }
                  >
                    {({ active }) => (
                      <>
                        <div
                          className={classNames(
                            'flex h-10 w-10 flex-none items-center justify-center rounded-lg'
                          )}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.thumbnail}
                            className="h-6 w-6 text-white"
                            aria-hidden="true"
                            alt={item.title}
                          />
                        </div>
                        <div className="ml-4 flex-auto">
                          <p
                            className={classNames(
                              'text-sm font-medium',
                              active ? 'text-gray-900' : 'text-gray-700'
                            )}
                          >
                            {item.title}
                          </p>
                          <p
                            className={classNames(
                              'text-sm',
                              active ? 'text-gray-700' : 'text-gray-500'
                            )}
                          >
                            {item.description}
                          </p>
                        </div>
                      </>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}

            {state.search.query !== '' && !data?.total ? (
              <div className="py-14 px-6 text-center text-sm sm:px-14">
                <ExclamationCircleIcon
                  type="outline"
                  name="exclamation-circle"
                  className="mx-auto h-6 w-6 text-gray-400"
                />
                <p className="mt-4 font-semibold text-gray-900">
                  No results found
                </p>
                <p className="mt-2 text-gray-500">
                  No components found for this search term. Please try again.
                </p>
              </div>
            ) : null}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
