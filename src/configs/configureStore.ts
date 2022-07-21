import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';

import rootReducer from '@reducers/index';

const isDev = process.env.NODE_ENV === 'development';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    isDev ? getDefaultMiddleware().concat(logger) : getDefaultMiddleware(),
  devTools: isDev,
});

export default store;
