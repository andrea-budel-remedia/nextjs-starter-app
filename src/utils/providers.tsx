'use client';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';
import { theme } from './theme';

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  );
}
