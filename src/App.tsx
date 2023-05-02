import React, { createContext, useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Header, LangContext } from './components';
import { Login, NotFound } from './pages';

import { Container, createTheme, GlobalStyles, PaletteMode, ThemeProvider } from '@mui/material';
import { getDesignTokens, theme } from './theme';

const App = (): JSX.Element => {
  const [mode, setMode] = useState<PaletteMode>('light');
  const langContext = useContext(LangContext);

  const changeMode = (prevMode: PaletteMode) => {
    return prevMode === 'light' ? 'dark' : 'light';
  };

  const recoverMode = (exMode: string) => {
    return exMode === 'light' ? 'light' : 'dark';
  };

  const colorMode = React.useMemo(
      () => ({
        toggleColorMode: () => {
          const prevMode = mode;
          setMode(() =>
              changeMode(prevMode)
          );
          localStorage.setItem('chatbox-theme', changeMode(prevMode));
        },
      }),
      [mode],
  );

  useEffect(() => {
    const existingMode = localStorage.getItem('chatbox-theme');
    if (existingMode) {
      setMode(recoverMode(existingMode));
    } else {
      localStorage.setItem('chatbox-theme', mode);
    }
  }, []);

  useEffect(() => {
    const existingLang = localStorage.getItem('chatbox-lang');
    if (existingLang) {
      langContext.recoverLanguage(existingLang);
    } else {
      localStorage.setItem('chatbox-lang', langContext.locale);
    }
  }, []);

  const ColorModeContext = createContext(colorMode);
  const themeWithMode = React.useMemo(() => {
    return createTheme(theme, getDesignTokens(mode));
  }, [mode]);

  return (
      <ColorModeContext.Provider value={colorMode}>
        <GlobalStyles
            styles={{
              body: {backgroundColor: themeWithMode.palette.secondary.light}
            }}
        />
        <ThemeProvider theme={themeWithMode}>
          <Header modeSwitch={colorMode.toggleColorMode} langSwitch={langContext.selectLanguage} />
          <Container maxWidth='lg'>
            <Routes>
              <Route path='*' element={<NotFound />} />
              <Route path='/' element={<Login />} />
              {/*<Route path='/home/' element={<Home />} />*/}
            </Routes>
          </Container>
        </ThemeProvider>
      </ColorModeContext.Provider>
  );
};

export default App;
