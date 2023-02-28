'use client';
import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
//import { wrapper } from './store';
import { theme } from './theme';
import { makeStore } from './store';

type AppProviderProps = React.PropsWithChildren<{ initialState?: unknown }>;

export function AppProvider({ children, initialState }: AppProviderProps) {
  //const { store } = wrapper.useWrappedStore(initialState);
  console.log('App Provider', initialState);
  const store = makeStore({ initialState });
  return (
    <Provider store={store}>
      {/*
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
      */}
      {children}
    </Provider>
  );
}
