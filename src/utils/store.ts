import { dummyApi } from '@/services/dummy.service';
import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '@/modules/auth/slice';
import { lessonSlice } from '@/modules/content/lesson/slice';
//import { createWrapper } from 'next-redux-wrapper';

type MakeStoreOptions = {
  initialState?: any;
};
export const makeStore = ({ initialState }: MakeStoreOptions) =>
  configureStore({
    preloadedState: initialState,
    reducer: {
      [dummyApi.reducerPath]: dummyApi.reducer,
      [authSlice.name]: authSlice.reducer,
      [lessonSlice.name]: lessonSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(dummyApi.middleware),
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

//export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
