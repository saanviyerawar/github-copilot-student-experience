import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { ModeProvider } from './contexts/ModeProvider';
import { HashRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ModeProvider>
        <HashRouter>
          <App />
        </HashRouter>
    </ModeProvider>
  </React.StrictMode>
);

reportWebVitals();
