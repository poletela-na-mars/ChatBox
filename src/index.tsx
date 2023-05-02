import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { LangWrapper } from './components';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
      <BrowserRouter>
        <LangWrapper>
          <App />
        </LangWrapper>
      </BrowserRouter>
    </React.StrictMode>
);
