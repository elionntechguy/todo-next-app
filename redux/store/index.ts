import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { createWrapper, Context } from 'next-redux-wrapper';

import logger from 'redux-logger';

import rootReducer from '../reducers/rootReducer';
import rootSaga from '../sagas/rootSaga';

export const makeStore = (context: Context) => {
  const saga = createSagaMiddleware();

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(saga, logger),
  });

  saga.run(rootSaga);

  return store;
};

type Store = ReturnType<typeof makeStore>;

export type AppDispatch = Store['dispatch'];
export type RootState = ReturnType<Store['getState']>;

export const wrapper = createWrapper<Store>(makeStore, { debug: true });
