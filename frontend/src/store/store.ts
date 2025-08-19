import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import commonReducer from './commonSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      user: userReducer,
      common : commonReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];