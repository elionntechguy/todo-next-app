import { Store } from 'redux';
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

export const wrapper = createWrapper<Store>(makeStore, { debug: true });
