import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './routes/Router';
import settings from '../settings';
const root = ReactDOM.createRoot(document.getElementById('main'));
document.body.className = `${settings.theme}Theme`
root.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>
);
