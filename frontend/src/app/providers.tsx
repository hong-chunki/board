'use client'; 

import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    primary: '#0070f3',
    background: '#f0f0f0',
  },
};

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}