import React, { createContext, useState } from 'react';
import { Login, Header } from './index';
import { Container, createTheme, GlobalStyles, PaletteMode, ThemeProvider } from '@mui/material';
import { getDesignTokens, theme } from '../theme';

const App = (): JSX.Element => {
  const [mode, setMode] = useState<PaletteMode>('light');
  const colorMode = React.useMemo(
      () => ({
        // The dark mode switch would invoke this method
        toggleColorMode: () => {
          setMode((prevMode: PaletteMode) =>
              prevMode === 'light' ? 'dark' : 'light',
          );
        },
      }),
      [],
  );

  const ColorModeContext = createContext(colorMode);
  const themeWithMode = React.useMemo(() => createTheme(theme, getDesignTokens(mode)), [mode]);

  return (
      <ColorModeContext.Provider value={colorMode}>
        <GlobalStyles
            styles={{
              body: {backgroundColor: themeWithMode.palette.secondary.light}
            }}
        />
        <ThemeProvider theme={themeWithMode}>
          <Header />
          <Container maxWidth='lg'>
            <Login />
          </Container>
        </ThemeProvider>
      </ColorModeContext.Provider>
  );
};

export default App;
