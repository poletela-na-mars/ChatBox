import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import English from '../../lang/en.json';
import Russian from '../../lang/rus.json';

export const LangContext = React.createContext({
  locale: 'en',
  selectLanguage: () => {
  },
  recoverLanguage: (prevLang: string) => {
  },
});

const local = navigator.language;

let lang: {};

switch (local) {
  case 'en':
    lang = English;
    break;
  case 'rus':
    lang = Russian;
    break;
  default:
    lang = English;
}

export const LangWrapper = (props: { children: React.ReactNode }) => {
  const [locale, setLocale] = useState(local);
  const [messages, setMessages] = useState(lang);

  const setLangInMessages = (newLocale: string) => {
    switch (newLocale) {
      case 'en':
        setMessages(English);
        break;
      case 'rus':
        setMessages(Russian);
        break;
      default:
        setMessages(English);
    }
  };

  const recoverLanguage = (prevLang: string) => {
    const recoveredLocale = prevLang === 'en' ? 'en' : 'rus';
    setLocale(recoveredLocale);
    setLangInMessages(recoveredLocale);
  };

  const selectLanguage = () => {
    const newLocale = locale === 'en' ? 'rus' : 'en';
    setLocale(newLocale);
    setLangInMessages(newLocale);
    localStorage.setItem('chatbox-lang', newLocale);
  };

  return (
      <LangContext.Provider value={{locale, selectLanguage, recoverLanguage}}>
        <IntlProvider messages={messages} locale={locale}>
          {props.children}
        </IntlProvider>
      </LangContext.Provider>
  );
};
