import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
  }

  body {
    overscroll-behavior: none;
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  #root {
    overflow-y: auto;
    height: 100%;
    -webkit-overflow-scrolling: touch;
  }
`;


const root = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  root
);