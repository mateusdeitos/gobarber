/* eslint-disable react/no-children-prop */
/* eslint-disable no-restricted-globals */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from './styles/global';
import Routes from './routes';
import AppProvider from './hooks/index';

const App = () => (
  <Router>
    <AppProvider>
      <Routes />
    </AppProvider>
    <GlobalStyle />
  </Router>
);
export default App;